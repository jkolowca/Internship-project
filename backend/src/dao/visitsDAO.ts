import { Collection, MongoClient, ObjectId, AggregationCursor } from 'mongodb';
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
		let cursor: AggregationCursor;
		try {
			cursor = visits.aggregate([
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
					$sort: {
						startDate: 1,
					},
				},
			]);
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
			const listDoc = {
				startDate,
				endDate,
				clinic,
				doctor,
			};

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

	static async updateAppointment(visitId: ObjectId, appointment: Object) {
		try {
			await visits.updateOne(
				{ _id: visitId },
				{ $set: { appointment: appointment } }
			);
			return { success: true };
		} catch (e) {
			console.error(`Error occurred while logging in user, ${e}`);
			return { error: e };
		}
	}

	static async getDistinctDates(query?: any) {
		let cursor: AggregationCursor;
		try {
			cursor = visits.aggregate([
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

	static async updateVisit(
		visitId: ObjectId,
		startDate: Date,
		endDate: Date,
		clinic: string
	) {
		try {
			const updateResponse = await visits.updateOne(
				{ _id: new ObjectId(visitId) },
				{
					$set: {
						startDate: new Date(startDate),
						endDate: new Date(endDate),
						clinic: new ObjectId(clinic),
					},
				}
			);

			return updateResponse;
		} catch (e) {
			console.error(`Unable to update comment: ${e}`);
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
 * @property {Object} appointment
 */
