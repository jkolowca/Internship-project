import { Request, Response, NextFunction } from 'express';
import { VisitsDAO } from '../dao/visitsDAO';
import { ObjectId } from 'mongodb';
import { Visit } from '../models';

export class VisitsCtrl {
	static async apiFind(req: Request, res: Response, next: NextFunction) {
		const visits = await VisitsDAO.find(parseQuery(req.query));
		console.log(visits);
		res.json(visits);
	}

	static async apiGetRegistered(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		let id = new ObjectId(req.params.id);
		const visitsList = await VisitsDAO.find({
			'appointment._id': id,
		});
		res.json(visitsList);
	}

	static async apiGetFiltered(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		let city = req.params.city;
		let specialties = req.params.specialties;
		let startDate = new Date(req.params.startDate);
		let endDate = new Date(req.params.endDate);
		const visitsList = await VisitsDAO.find({
			'clinic.city': city,
			'doctor.specialties': { $in: [specialties] },
			startDate: { $gte: startDate },
			endDate: { $lte: endDate },
		});
		res.json(visitsList);
	}

	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			const visit: Visit = req.body;
			visit.startDate = new Date(visit.startDate);
			visit.endDate = new Date(visit.endDate);
			visit.clinic = new ObjectId(visit.clinic);
			visit.doctor = new ObjectId(visit.doctor);

			await VisitsDAO.add(visit);
			res.json({ status: 'success' });
		} catch (e) {
			console.log(e);
			res.status(500).json({ e });
		}
	}

	static async apiUpdate(req: Request, res: Response, next: NextFunction) {
		try {
			const { appointment, startDate, endDate, clinic } = req.body;
			const id = new ObjectId(req.params.id);

			if (!startDate && appointment) {
				appointment._id = new ObjectId(appointment._id);
				await VisitsDAO.updateAppointment(id, appointment);
			} else {
				await VisitsDAO.updateVisit(
					id,
					new Date(startDate),
					new Date(endDate),
					new ObjectId(clinic._id)
				);
			}
			console.log(req.params.id);
			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiDeleteAppointment(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const id = new ObjectId(req.params.id);
			await VisitsDAO.deleteAppointment(id);
			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiGetDates(req: Request, res: Response, next: NextFunction) {
		try {
			let visits = await VisitsDAO.getDistinctDates(
				parseQuery(req.query)
			);
			res.json(visits);
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
function parseQuery(query: any): Object {
	let parsed: { [k: string]: any } = {};
	if (query.type)
		parsed.startDate =
			query.type === 'active'
				? { $gte: new Date() }
				: { $lte: new Date() };
	if (query.doctor) parsed.doctor = new ObjectId(query.doctor);
	console.log(parsed);
	return parsed;
}
