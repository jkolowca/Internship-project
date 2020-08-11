import { ObjectId } from 'mongodb';
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
			let data = JSON.parse(
				fs.readFileSync('./src/mockup/doctors.json').toString()
			);

			let doctors = data.map((d: any) => {
				d._id = new ObjectId(d._id.$oid);
				d.clinics = d.clinics.map((c: any) => new ObjectId(c.$oid));
				return d;
			});

			DoctorsDAO.addMany(doctors);

			data = JSON.parse(
				fs.readFileSync('./src/mockup/clinics.json').toString()
			);

			let clinics = data.map((c: any) => {
				c._id = new ObjectId(c._id.$oid);
				return c;
			});

			ClinicsDAO.addMany(clinics);

			data = JSON.parse(
				fs.readFileSync('./src/mockup/users.json').toString()
			);

			let users = data.map((u: any) => {
				if (u.hasOwnProperty('doctorId')) {
					u.doctorId = new ObjectId(u.doctorId.$oid);
				}
				u._id = new ObjectId(u._id.$oid);
				return u;
			});

			UsersDAO.addMany(users);

			data = JSON.parse(
				fs.readFileSync('./src/mockup/visits.json').toString()
			);

			let visits = data.map((v: any) => {
				v._id = new ObjectId(v._id.$oid);
				v.startDate = new Date(v.startDate.$date);
				v.endDate = new Date(v.endDate.$date);
				v.clinic = new ObjectId(v.clinic.$oid);
				v.doctor = new ObjectId(v.doctor.$oid);
				if (v.hasOwnProperty('appointment')) {
					v.appointment._id = new ObjectId(v.appointment._id.$oid);
				}
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
router.route('/').post(Mockup.apiAdd);
