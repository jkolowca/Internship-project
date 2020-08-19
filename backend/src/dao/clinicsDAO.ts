import { Collection, MongoClient, Cursor } from 'mongodb';
import { Clinic } from '../../../common/interfaces';

let clinicsCollection: Collection<Clinic>;

export class ClinicsDAO {
	static async injectDB(conn: MongoClient) {
		if (clinicsCollection) {
			return;
		}
		try {
			clinicsCollection = conn.db('registration').collection('clinics');
		} catch (e) {
			console.error(`ClinicsDAO: Unable to establish a collection handle: ${e}`);
		}
	}

	static async getAll() {
		let cursor: Cursor<Clinic>;
		try {
			cursor = clinicsCollection.find().sort({ name: 1 });
		} catch (e) {
			console.error(`ClinicsDAO: Unable to issue find command: ${e}`);
			return [];
		}

		try {
			const clinics = await cursor.toArray();

			return clinics;
		} catch (e) {
			console.error(`ClinicsDAO: Unable to convert cursor to array or problem counting documents: ${e}`);
			return [];
		}
	}

	static async add(clinic: Clinic) {
		try {
			return await clinicsCollection.insertOne(clinic);
		} catch (e) {
			console.error(`ClinicsDAO: Unable to post clinic: ${e}`);
			return { error: e };
		}
	}

	static async addMany(clinics: Clinic[]) {
		try {
			return await clinicsCollection.insertMany(clinics);
		} catch (e) {
			console.error(`ClinicsDAO: Unable to post clinic: ${e}`);
			return { error: e };
		}
	}

	static async getCities() {
		try {
			return (await clinicsCollection.distinct('address.city')) as string[];
		} catch (e) {
			console.error(`ClinicsDAO: Unable to get distinct values: ${e}`);
			return { error: e };
		}
	}

	static async delete(_id: string) {
		try {
			return await clinicsCollection.deleteOne({ _id });
		} catch (e) {
			console.error(`ClinicsDAO: Unable to delete clinic: ${e}`);
			return { error: e };
		}
	}
}
