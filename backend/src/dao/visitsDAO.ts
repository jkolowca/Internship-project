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

	static async find(beforeLookup?: {}, afterLookup?: {}) {
		let cursor: AggregationCursor;
		let visits, dates;
		try {
			cursor = visitsCollection.aggregate([
				{
					$match: beforeLookup,
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
					$match: afterLookup,
				},
				{
					$sort: {
						startDate: 1,
					},
				},
			]);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { visits: [], dates: [] };
		}

		try {
			visits = await cursor.toArray();
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { visits: [], dates: [] };
		}
		try {
			cursor
				.group({
					_id: {
						$substr: ['$startDate', 0, 10],
					},
					count: {
						$sum: 1,
					},
				})
				.sort({
					_id: 1,
				});
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { visits, dates: [] };
		}

		try {
			dates = await cursor.toArray();
			return { visits, dates };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { visits, dates: [] };
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
