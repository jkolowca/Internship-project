import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import { DoctorsDAO } from '../dao/doctorsDAO';
import { ClinicsDAO } from '../dao/clinicsDAO';
import { UsersDAO } from '../dao/usersDAO';
import { VisitsDAO } from '../dao/visitsDAO';
import { UserDB } from '../../../common/interfaces';
var json2mongo = require('json2mongo');

export class Mockup {
	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			let data = JSON.parse(fs.readFileSync('./src/mockup/doctors.json').toString());
			json2mongo(data);
			DoctorsDAO.drop();
			DoctorsDAO.addMany(data);

			data = JSON.parse(fs.readFileSync('./src/mockup/clinics.json').toString());
			json2mongo(data);
			ClinicsDAO.drop();
			ClinicsDAO.addMany(data);

			data = JSON.parse(fs.readFileSync('./src/mockup/users.json').toString());
			json2mongo(data);
			const users: UserDB[] = data;
			users.forEach(async user => (user.password = await bcrypt.hash(user.password, 10)));
			UsersDAO.drop();
			UsersDAO.addMany(users);

			data = JSON.parse(fs.readFileSync('./src/mockup/visits.json').toString());
			json2mongo(data);
			VisitsDAO.drop();
			VisitsDAO.addMany(data);

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}

export const router = Router();
router.route('/').get(Mockup.apiAdd);
