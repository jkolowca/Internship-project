import { Collection, MongoClient, Cursor, ObjectId } from 'mongodb';
let visits: Collection<any>;

export class VisitsDAO {
	static async injectDB(conn: MongoClient) {
		if (visits) {
			return;
		}
		try {
			visits = conn.db('registration').collection('visits');
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in VisitsDAO: ${e}`
			);
		}
	}

	static async getAll() {
		let cursor: Cursor;
		try {
			cursor = visits.find();
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { visitsList: [] };
		}

		try {
			const visitsList = await cursor.toArray();

			return { visitsList };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { visitsList: [] };
		}
	}

	static async add(
		startDate: Date,
		endDate: Date,
		clinic: ObjectId,
		doctor: ObjectId
	) {
		try {
			const listDoc = { startDate, endDate, clinic, doctor };

			return await visits.insertOne(listDoc);
		} catch (e) {
			console.error(`Unable to post list: ${e}`);
			return { error: e };
		}
	}

	static async deleteVisitsByDoctorId(doctorId: ObjectId) {
		try {
			const deleteResponse = await visits.deleteMany({
				doctor: doctorId,
			});

			return deleteResponse;
		} catch (e) {
			console.error(`Unable to delete visit: ${e}`);
			return { error: e };
		}
	}
}

/**
 * A Visit
 * @typedef Visit
 * @property {ObjectId} _id
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {ObjectId} clinic
 * @property {ObjectId} doctor
 */
