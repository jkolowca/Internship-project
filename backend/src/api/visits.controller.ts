import { Request, Response, NextFunction } from 'express';
import { VisitsDAO } from '../dao/visitsDAO';

export class VisitsCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const { visitsList } = await VisitsDAO.getAll();
		res.json(visitsList);
	}

	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			const { startDate, endDate, clinic, doctor } = req.body;

			await VisitsDAO.add(startDate, endDate, clinic, doctor);

			const updated = await VisitsDAO.getAll();

			res.json({ status: 'success', visits: updated });
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
