import { Request, Response, NextFunction } from 'express';
import { VisitsDAO } from '../dao/visitsDAO';
import { ObjectId } from 'mongodb';

export class VisitsCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const { visitsList } = await VisitsDAO.getAll({
			startDate: { $gte: new Date() },
		});
		res.json(visitsList);
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
			const { startDate, endDate, clinic, doctor } = req.body;

			await VisitsDAO.add(
				new Date(startDate),
				new Date(endDate),
				new ObjectId(clinic),
				new ObjectId(doctor)
			);

			const updated = await VisitsDAO.getAll();

			res.json({ status: 'success', visits: updated });
		} catch (e) {
			console.log(e);
			res.status(500).json({ e });
		}
	}

	static async apiUpdate(req: Request, res: Response, next: NextFunction) {
		try {
			console.log('update');
			const { appointment, startDate, endDate, clinic } = req.body;
			const id = new ObjectId(req.params.id);
			if (!startDate) {
				await VisitsDAO.updateAppointment(id, appointment);
			} else {
				await VisitsDAO.updateVisit(id, startDate, endDate, clinic);
			}
			const updated = await VisitsDAO.getAll();
			console.log(req.params.id);
			res.json({ status: 'success', visits: updated });
		} catch (e) {
			res.status(500).json({ e });
		}
	}
	static async apiGetDates(req: Request, res: Response, next: NextFunction) {
		try {
			let { visitsList } = await VisitsDAO.getDistinctDates({
				startDate: { $gte: new Date() },
			});
			res.json(visitsList);
		} catch (e) {
			res.status(500).json({ e });
		}
	}

}
