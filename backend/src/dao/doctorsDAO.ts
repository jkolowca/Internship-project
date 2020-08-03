import { Collection, MongoClient, Cursor, ObjectId } from 'mongodb';
let doctors: Collection<any>;

export class DoctorsDAO {
	static async injectDB(conn: MongoClient) {
		if (doctors) {
			return;
		}
		try {
			doctors = conn.db('registration').collection('doctors');
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in tasksDAO: ${e}`
			);
		}
	}

	static async getAll() {
		let cursor: Cursor;
		try {
			cursor = doctors.find();
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { doctorsList: [] };
		}

		try {
			const doctorsList = await cursor.toArray();

			return { doctorsList };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { doctorsList: [] };
		}
	}

	static async getById(id: ObjectId) {
		try {
			return await doctors.findOne({ _id: id });
		} catch (e) {
			console.error(`Something went wrong in doctorsDAO getById: ${e}`);
			return { doctorsList: [] };
		}
	}

	static async update(
		doctorId: ObjectId,
		name: string,
		surname: string,
		specialties: string[],
		clinics: ObjectId[]
	) {
		try {
			const updateResponse = await doctors.updateOne(
				{ _id: doctorId },
				{ $set: { name, surname, specialties, clinics } }
			);

			return updateResponse;
		} catch (e) {
			console.error(`Unable to update doctor: ${e}`);
			return { error: e };
		}
	}

	static async delete(doctorId: ObjectId) {
		try {
			const deleteResponse = await doctors.deleteOne({
				_id: doctorId,
			});

			return deleteResponse;
		} catch (e) {
			console.error(`Unable to delete doctor: ${e}`);
			return { error: e };
		}
	}

	static async add(
		name: string,
		surname: string,
		specialties: string[],
		clinics: ObjectId[]
	) {
		try {
			const listDoc = { name, surname, specialties, clinics };

			return await doctors.insertOne(listDoc);
		} catch (e) {
			console.error(`Unable to post list: ${e}`);
			return { error: e };
		}
	}

	static async getSpecialties(){
		try {
			return await doctors.distinct("specialties");
		} catch (e) {
			console.error(`Unable to post list: ${e}`);
			return { error: e };
		}
	}
}

/**
 * A Doctor
 * @typedef Doctor
 * @property {ObjectId} _id
 * @property {string} startDate
 * @property {string} endDate
 * @property {string[]} specialties
 * @property {ObjectId[]} clinics
 */
