import { Request, Response, NextFunction } from 'express';
import { ClinicsDAO } from '../dao/clinicsDAO';

export class ClinicsCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const { query } = req.body;
		const { clinicsList } = await ClinicsDAO.getAll();
		res.json(clinicsList);
	}

	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, city, street, streetNo } = req.body;

			await ClinicsDAO.add(name, city, street, streetNo);

			const updated = await ClinicsDAO.getAll();

			res.json({ status: 'success', visits: updated });
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
