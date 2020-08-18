import { Collection, MongoClient, ObjectId, AggregationCursor } from 'mongodb';
import { Appointment, Visit, VisitAggregate } from '../../../common/interfaces';
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
				`VisitsDAO: Unable to establish a collection handle: ${e}`
			);
		}
	}

	static async find(
		beforeLookup?: {},
		afterLookup?: {},
		page = 0,
		visitsPerPage = 10
	) {
		let cursor: AggregationCursor<VisitAggregate>;
		let visits, visitsCount;
		try {
			cursor = visitsCollection.aggregate([
				{ $match: beforeLookup },
				{
					$lookup: {
						from: 'doctors',
						localField: 'doctor',
						foreignField: '_id',
						as: 'doctor',
					},
				},
				{ $unwind: { path: '$doctor' } },
				{
					$lookup: {
						from: 'clinics',
						localField: 'clinic',
						foreignField: '_id',
						as: 'clinic',
					},
				},
				{ $unwind: { path: '$clinic' } },
				{ $match: afterLookup },
				{ $sort: { startDate: 1 } },
			]);

			visitsCount = (await cursor.toArray()).length;

			visits = await cursor
				.skip(page * visitsPerPage)
				.limit(visitsPerPage)
				.toArray();

			return { visits, visitsCount };
		} catch (e) {
			console.error(
				`VisitsDAO: Error while collecting visits data: ${e}`
			);
			return { visits: [], visitsCount: 0 };
		}
	}

	static async add(visit: Visit) {
		try {
			return await visitsCollection.insertOne(visit);
		} catch (e) {
			console.error(`VisitsDAO: Unable to post visit: ${e}`);
			return { error: e };
		}
	}

	static async addMany(visits: Visit[]) {
		try {
			return await visitsCollection.insertMany(visits);
		} catch (e) {
			console.error(`VisitsDAO: Unable to post visits: ${e}`);
			return { error: e };
		}
	}

	static async deleteVisitsByDoctorId(doctorId: string) {
		try {
			return await visitsCollection.deleteMany({
				doctor: doctorId,
			});
		} catch (e) {
			console.error(`VisitsDAO: Unable to delete visits: ${e}`);
			return { error: e };
		}
	}

	static async delete(_id: string) {
		try {
			return await visitsCollection.deleteOne({ _id });
		} catch (e) {
			console.error(`VisitsDAO: Unable to delete visit: ${e}`);
			return { error: e };
		}
	}

	static async updateAppointment(visitId: string, appointment: Appointment) {
		try {
			await visitsCollection.updateOne(
				{ _id: visitId },
				{ $set: { appointment } }
			);
			return { success: true };
		} catch (e) {
			console.error(`VisitsDAO: Unable to update appointment: ${e}`);
			return { error: e };
		}
	}

	static async deleteAppointment(visitId: string) {
		try {
			await visitsCollection.updateOne(
				{ _id: visitId },
				{ $unset: { appointment: '' } }
			);
			return { success: true };
		} catch (e) {
			console.error(`VisitsDAO: Unable to delete appointment: ${e}`);
			return { error: e };
		}
	}

	static async updateVisit(
		_id: string,
		startDate: Date,
		endDate: Date,
		clinic: string
	) {
		try {
			const updateResponse = await visitsCollection.updateOne(
				{ _id },
				{ $set: { startDate, endDate, clinic } }
			);

			return updateResponse;
		} catch (e) {
			console.error(`VisitsDAO: Unable to update visit: ${e}`);
			return { error: e };
		}
	}
}
