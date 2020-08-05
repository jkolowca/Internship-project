import { Collection, MongoClient, Cursor } from 'mongodb';
import { Clinic } from '../models';

let clinics: Collection<Clinic>;

export class ClinicsDAO {
	static async injectDB(conn: MongoClient) {
		if (clinics) {
			return;
		}
		try {
			clinics = conn.db('registration').collection('clinics');
		} catch (e) {
			console.error(
				`ClinicsDAO: Unable to establish a collection handle: ${e}`
			);
		}
	}

	static async getAll() {
		let cursor: Cursor<Clinic>;
		try {
			cursor = clinics.find();
		} catch (e) {
			console.error(`ClinicsDAO: Unable to issue find command: ${e}`);
			return [];
		}

		try {
			const clinics = await cursor.toArray();

			return clinics;
		} catch (e) {
			console.error(
				`ClinicsDAO: Unable to convert cursor to array or problem counting documents: ${e}`
			);
			return [];
		}
	}

	static async add(clinic: Clinic) {
		try {
			return await clinics.insertOne(clinic);
		} catch (e) {
			console.error(`ClinicsDAO: Unable to post clinic: ${e}`);
			return { error: e };
		}
	}

	static async getCities() {
		try {
			return await clinics.distinct('city');
		} catch (e) {
			console.error(`ClinicsDAO: Unable to get distinct values: ${e}`);
			return { error: e };
		}
	}
}
