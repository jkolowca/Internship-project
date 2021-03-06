import { Request, Response, NextFunction } from 'express';
import { ClinicsDAO } from '../dao/clinicsDAO';
import { ClinicDB } from '../../../common/interfaces';
import { ObjectId } from 'mongodb';

export class ClinicsCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const clinics = await ClinicsDAO.getAll();
		res.json(clinics);
	}

	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			const clinic: ClinicDB = req.body;
			await ClinicsDAO.add(clinic);

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiGetCities(req: Request, res: Response, next: NextFunction) {
		try {
			const cities = await ClinicsDAO.getCities();
			res.json(cities);
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiDelete(req: Request, res: Response, next: NextFunction) {
		try {
			let id = new ObjectId(req.params.id);
			await ClinicsDAO.delete(id);
			const clinics = await ClinicsDAO.getAll();
			res.json(clinics);
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
