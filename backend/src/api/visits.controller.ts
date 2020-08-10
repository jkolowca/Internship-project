import { Request, Response, NextFunction } from 'express';
import { VisitsDAO } from '../dao/visitsDAO';
import { ObjectId } from 'mongodb';
import { Visit } from '../models';

export class VisitsCtrl {
	static async apiFind(req: Request, res: Response, next: NextFunction) {
		console.log(req.query);
		let beforeLookup: { [k: string]: any } = {},
			afterLookup: { [k: string]: any } = {};
		if (req.query.type)
			beforeLookup['startDate'] =
				req.query.type === 'active'
					? { $gte: new Date() }
					: { $lte: new Date() };
		if (req.query.doctor)
			beforeLookup['doctor'] = new ObjectId(req.query.doctor as string);
		if (req.query.patient)
			beforeLookup['appointment._id'] = new ObjectId(
				req.query.patient as string
			);
		if (req.query.startDate)
			beforeLookup['startDate'] = {
				$gte: new Date(req.query.startDate as string),
			};
		if (req.query.endDate)
			beforeLookup['endDate'] = {
				$lte: new Date(req.query.endDate as string),
			};
		if (req.query.appointment)
			beforeLookup['appointment'] =
				req.query.appointment === 'available'
					? { $exists: false }
					: { $exists: true };
		if (req.query.city)
			afterLookup['clinic.city'] = {
				$in: (req.query.city as string).split(','),
			};
		if (req.query.speciality)
			afterLookup['doctor.specialties'] = req.query.speciality;

		const { visits, dates } = await VisitsDAO.find(
			beforeLookup,
			afterLookup
		);
		res.json({ visits, dates });
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
}
