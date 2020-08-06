import { Collection, MongoClient, ObjectId, AggregationCursor } from 'mongodb';
import { Appointment, Visit } from '../models';
let visitsCollection: Collection<Visit>;

export class VisitsDAO {
	static async injectDB(conn: MongoClient) {
		if (visitsCollection) {
			return;
		}
		try {
			visitsCollection = conn.db('registration').collection('visits');
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in VisitsDAO: ${e}`
			);
		}
	}

	static async find(query: Object = {}, lateQuery: Object = {}) {
		let cursor: AggregationCursor;
		try {
			cursor = visitsCollection.aggregate([
				{
					$match: query,
				},
				{
					$lookup: {
						from: 'doctors',
						localField: 'doctor',
						foreignField: '_id',
						as: 'doctor',
					},
				},
				{
					$lookup: {
						from: 'clinics',
						localField: 'clinic',
						foreignField: '_id',
						as: 'clinic',
					},
				},
				{
					$unwind: {
						path: '$clinic',
					},
				},
				{
					$unwind: {
						path: '$doctor',
					},
				},
				{
					$match: lateQuery,
				},
				{
					$sort: {
						startDate: 1,
					},
				},
			]);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return [];
		}

		try {
			return await cursor.toArray();
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return [];
		}
	}

	static async add(visit: Visit) {
		try {
			return await visitsCollection.insertOne(visit);
		} catch (e) {
			console.error(`Unable to post list: ${e}`);
			return { error: e };
		}
	}

	static async deleteVisitsByDoctorId(doctorId: ObjectId) {
		try {
			return await visitsCollection.deleteMany({
				doctor: doctorId,
			});
		} catch (e) {
			console.error(`Unable to delete visit: ${e}`);
			return { error: e };
		}
	}

	static async updateAppointment(
		visitId: ObjectId,
		appointment: Appointment
	) {
		try {
			await visitsCollection.updateOne(
				{ _id: visitId },
				{ $set: { appointment } }
			);
			return { success: true };
		} catch (e) {
			console.error(`Error occurred while logging in user, ${e}`);
			return { error: e };
		}
	}

	static async deleteAppointment(visitId: ObjectId) {
		try {
			await visitsCollection.updateOne(
				{ _id: visitId },
				{ $unset: { appointment: '' } }
			);
			return { success: true };
		} catch (e) {
			console.error(`Error occurred while delete appointment, ${e}`);
			return { error: e };
		}
	}

	static async getDistinctDates(query: Object = {}) {
		let cursor: AggregationCursor;
		try {
			cursor = visitsCollection.aggregate([
				{
					$match: query,
				},
				{
					$group: {
						_id: {
							$substr: ['$startDate', 0, 10],
						},
						count: {
							$sum: 1,
						},
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
			]);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return [];
		}

		try {
			return await cursor.toArray();
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return [];
		}
	}

	static async updateVisit(
		_id: ObjectId,
		startDate: Date,
		endDate: Date,
		clinic: ObjectId
	) {
		try {
			const updateResponse = await visitsCollection.updateOne(
				{ _id },
				{ $set: { startDate, endDate, clinic } }
			);

			return updateResponse;
		} catch (e) {
			console.error(`Unable to update visit: ${e}`);
			return { error: e };
		}
	}
}
