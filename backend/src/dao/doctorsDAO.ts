import {
	Collection,
	MongoClient,
	Cursor,
	ObjectId,
	AggregationCursor,
} from 'mongodb';
import { Doctor, Clinic } from '../models';
let doctors: Collection<Doctor>;

export class DoctorsDAO {
	static async injectDB(conn: MongoClient) {
		if (doctors) {
			return;
		}
		try {
			doctors = conn.db('registration').collection('doctors');
		} catch (e) {
			console.error(
				`DoctorsDAO: Unable to establish a collection handle: ${e}`
			);
		}
	}

	static async getAll() {
		let cursor: Cursor<Doctor>;
		try {
			cursor = doctors.find();
		} catch (e) {
			console.error(`DoctorsDAO: Unable to issue find command: ${e}`);
			return [];
		}

		try {
			const doctors = await cursor.toArray();

			return doctors;
		} catch (e) {
			console.error(
				`DoctorsDAO: Unable to convert cursor to array or problem counting documents: ${e}`
			);
			return [];
		}
	}

	static async getById(id: ObjectId) {
		try {
			return await doctors.findOne({ _id: id });
		} catch (e) {
			console.error(`DoctorsDAO: Unable to issue find command: ${e}`);
			return undefined;
		}
	}

	static async update(_id: ObjectId, doctor: Doctor) {
		doctor.clinics = doctor.clinics.map(string => new ObjectId(string));
		try {
			return await doctors.updateOne({ _id: _id }, { $set: doctor });
		} catch (e) {
			console.error(`DoctorsDAO: Unable to update doctor: ${e}`);
			return { error: e };
		}
	}

	static async delete(_id: ObjectId) {
		try {
			return await doctors.deleteOne({ _id });
		} catch (e) {
			console.error(`DoctorsDAO: Unable to delete doctor: ${e}`);
			return { error: e };
		}
	}

	static async add(doctor: Doctor) {
		try {
			doctor.clinics = doctor.clinics.map(string => new ObjectId(string));
			return await doctors.insertOne(doctor);
		} catch (e) {
			console.error(`DoctorsDAO: Unable to post doctor: ${e}`);
			return { error: e };
		}
	}

	static async getSpecialties() {
		try {
			return await doctors.distinct('specialties');
		} catch (e) {
			console.error(`DoctorsDAO: Unable to get distinct values: ${e}`);
			return { error: e };
		}
	}

	static async getClinics(id: ObjectId) {
		let cursor: AggregationCursor<{ _id: ObjectId; clinics: Clinic[] }>;
		try {
			cursor = doctors.aggregate([
				{
					$match: {
						_id: id,
					},
				},
				{
					$lookup: {
						from: 'clinics',
						localField: 'clinics',
						foreignField: '_id',
						as: 'clinics',
					},
				},
				{
					$project: {
						clinics: 1,
					},
				},
			]);
		} catch (e) {
			console.error(
				`DoctorsDAO: Unable to issue aggregate command: ${e}`
			);
			return [];
		}

		try {
			const result = (await cursor.toArray()).pop();
			if (!result) return [];
			return result.clinics;
		} catch (e) {
			console.error(
				`DoctorsDAO: Unable to convert cursor to array or problem counting documents: ${e}`
			);
			return [];
		}
	}
}
