import { Request, Response, NextFunction } from 'express';
import { VisitsDAO } from '../dao/visitsDAO';
import { ObjectId } from 'mongodb';
import { Visit } from '../models';

export class VisitsCtrl {
	static async apiFind(req: Request, res: Response, next: NextFunction) {
		let beforeLookup: { [k: string]: any } = {},
			afterLookup: { [k: string]: any } = {};
		let query = req.query;

		if (query.type)
			beforeLookup.startDate =
				query.type === 'active'
					? { $gte: new Date() }
					: { $lte: new Date() };
		if (query.doctor)
			beforeLookup.doctor = new ObjectId(query.doctor as string);
		if (query.patient)
			beforeLookup['appointment._id'] = new ObjectId(
				query.patient as string
			);
		if (query.startDate)
			beforeLookup.startDate = {
				$gte: new Date(query.startDate as string),
			};
		if (query.endDate)
			beforeLookup.endDate = {
				$lte: new Date(query.endDate as string),
			};
		if (query.appointment)
			beforeLookup.appointment =
				query.appointment === 'available'
					? { $exists: false }
					: { $exists: true };

		if (query.city)
			afterLookup['clinic.city'] = {
				$in: (query.city as string).split(','),
			};
		if (query.speciality)
			afterLookup['doctor.specialties'] = req.query.speciality;

		let page = req.query.page ? parseInt(req.query.page as string, 10) : 0;

		let visitsPerPage = req.query.visitsPerPage
			? parseInt(req.query.visitsPerPage as string, 10)
			: 10;

		const { visits, visitsCount } = await VisitsDAO.find(
			beforeLookup,
			afterLookup,
			page,
			visitsPerPage
		);
		res.json({ visits, visitsCount });
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
			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiDelete(req: Request, res: Response, next: NextFunction) {
		try {
			let id = new ObjectId(req.params.id);
			await VisitsDAO.delete(id);
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
}
