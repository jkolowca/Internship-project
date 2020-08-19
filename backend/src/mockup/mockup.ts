import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import fs from 'fs';
import { DoctorsDAO } from '../dao/doctorsDAO';
import { ClinicsDAO } from '../dao/clinicsDAO';
import { UsersDAO } from '../dao/usersDAO';
import { VisitsDAO } from '../dao/visitsDAO';

export class Mockup {
	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			let data = JSON.parse(fs.readFileSync('./src/mockup/doctors.json').toString());

			DoctorsDAO.addMany(data);

			data = JSON.parse(fs.readFileSync('./src/mockup/clinics.json').toString());

			ClinicsDAO.addMany(data);

			data = JSON.parse(fs.readFileSync('./src/mockup/users.json').toString());

			UsersDAO.addMany(data);

			data = JSON.parse(fs.readFileSync('./src/mockup/visits.json').toString());

			let visits = data.map((v: any) => {
				v.startDate = new Date(v.startDate.$date);
				v.endDate = new Date(v.endDate.$date);
				return v;
			});

			VisitsDAO.addMany(visits);

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}

export const router = Router();
router.route('/').get(Mockup.apiAdd);
