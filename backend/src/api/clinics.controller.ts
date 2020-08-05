import { Request, Response, NextFunction } from 'express';
import { ClinicsDAO } from '../dao/clinicsDAO';
import { Clinic } from '../models';

export class ClinicsCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const { query } = req.body;
		const clinics = await ClinicsDAO.getAll();
		res.json(clinics);
	}

	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			const clinic: Clinic = req.body;

			await ClinicsDAO.add(clinic);

			const clinics = await ClinicsDAO.getAll();

			res.json({ status: 'success', clinics });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async getCities(req: Request, res: Response, next: NextFunction) {
		try {
			const cities = await ClinicsDAO.getCities();
			res.json(cities);
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
