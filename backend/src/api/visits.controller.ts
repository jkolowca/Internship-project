import { Request, Response, NextFunction } from 'express';
import { VisitsDAO } from '../dao/visitsDAO';
import { ObjectId } from 'mongodb';
import { Visit } from '../models';

export class VisitsCtrl {
	static async apiFind(req: Request, res: Response, next: NextFunction) {
		const visits = await VisitsDAO.find({
			startDate: { $gte: new Date() },
		});
		res.json(visits);
	}

	static async apiGetRegistered(req: Request, res: Response, next: NextFunction){
		let id = req.params.id;
		const { visitsList } = await VisitsDAO.getAll({
			"appointment._id": id
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

	static async apiGetDates(req: Request, res: Response, next: NextFunction) {
		try {
			let visits = await VisitsDAO.getDistinctDates({
				startDate: { $gte: new Date() },
			});
			res.json(visits);
		} catch (e) {
			res.status(500).json({ e });
		}
	}

}
