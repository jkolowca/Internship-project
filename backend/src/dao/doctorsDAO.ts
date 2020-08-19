import { Collection, MongoClient, Cursor, AggregationCursor } from 'mongodb';
import { Doctor, Clinic, DoctorData } from '../../../common/interfaces';
let doctorsCollection: Collection<Doctor>;

export class DoctorsDAO {
	static async injectDB(conn: MongoClient) {
		if (doctorsCollection) {
			return;
		}
		try {
			doctorsCollection = conn.db('registration').collection('doctors');
		} catch (e) {
			console.error(`DoctorsDAO: Unable to establish a collection handle: ${e}`);
		}
	}

	static async getAll() {
		let cursor: Cursor<Doctor>;
		try {
			cursor = doctorsCollection.find().sort({ surname: 1, name: 1 });
		} catch (e) {
			console.error(`DoctorsDAO: Unable to issue find command: ${e}`);
			return [];
		}

		try {
			const doctors = await cursor.toArray();

			return doctors;
		} catch (e) {
			console.error(`DoctorsDAO: Unable to convert cursor to array or problem counting documents: ${e}`);
			return [];
		}
	}

	static async getById(_id: string) {
		try {
			return await doctorsCollection.findOne({ _id });
		} catch (e) {
			console.error(`DoctorsDAO: Unable to issue find command: ${e}`);
			return undefined;
		}
	}

	static async update(_id: string, doctor: DoctorData) {
		try {
			return await doctorsCollection.updateOne({ _id }, { $set: doctor });
		} catch (e) {
			console.error(`DoctorsDAO: Unable to update doctor: ${e}`);
			return { error: e };
		}
	}

	static async delete(_id: string) {
		try {
			return await doctorsCollection.deleteOne({ _id });
		} catch (e) {
			console.error(`DoctorsDAO: Unable to delete doctor: ${e}`);
			return { error: e };
		}
	}

	static async add(doctor: Doctor) {
		try {
			return await doctorsCollection.insertOne(doctor);
		} catch (e) {
			console.error(`DoctorsDAO: Unable to post doctor: ${e}`);
			return { error: e };
		}
	}

	static async addMany(doctors: Doctor[]) {
		try {
			return await doctorsCollection.insertMany(doctors);
		} catch (e) {
			console.error(`DoctorsDAO: Unable to post doctors: ${e}`);
			return { error: e };
		}
	}

	static async getSpecialties() {
		try {
			return await doctorsCollection.distinct('specialties');
		} catch (e) {
			console.error(`DoctorsDAO: Unable to get distinct values: ${e}`);
			return { error: e };
		}
	}

	static async getClinics(_id: string) {
		let cursor: AggregationCursor<{ _id: string; clinics: Clinic[] }>;
		try {
			cursor = doctorsCollection.aggregate([
				{
					$match: {
						_id
					}
				},
				{
					$lookup: {
						from: 'clinics',
						localField: 'clinics',
						foreignField: '_id',
						as: 'clinics'
					}
				},
				{
					$project: {
						clinics: 1
					}
				}
			]);
		} catch (e) {
			console.error(`DoctorsDAO: Unable to issue aggregate command: ${e}`);
			return [];
		}

		try {
			const result = (await cursor.toArray()).pop();
			if (!result) return [];
			return result.clinics;
		} catch (e) {
			console.error(`DoctorsDAO: Unable to convert cursor to array or problem counting documents: ${e}`);
			return [];
		}
	}
}
