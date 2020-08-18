import { Request, Response, NextFunction } from 'express';
import { DoctorsDAO } from '../dao/doctorsDAO';
import { VisitsDAO } from '../dao/visitsDAO';
import { ObjectId, UpdateWriteOpResult } from 'mongodb';
import { Doctor } from '../../../common/interfaces';

export class DoctorsCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const doctors = await DoctorsDAO.getAll();
		res.json(doctors);
	}

	static async apiGetById(req: Request, res: Response, next: NextFunction) {
		try {
			let id = new ObjectId(req.params.id);
			let doctor = await DoctorsDAO.getById(id);
			if (!doctor) {
				res.status(404).json({ error: 'Not found' });
				return;
			}

			res.json(doctor);
		} catch (e) {
			console.log(`api, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetClinics(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			let id = new ObjectId(req.params.id);
			let clinics = await DoctorsDAO.getClinics(id);
			if (!clinics) {
				res.status(404).json({ error: 'Not found' });
				return;
			}
			res.json(clinics);
		} catch (e) {
			console.log(`api, ${e}`);
			res.status(500).json({ error: e });
		}
	}
	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			const doctor: Doctor = req.body;
			doctor.clinics = doctor.clinics.map(string => new ObjectId(string));

			await DoctorsDAO.add(doctor);

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiUpdate(req: Request, res: Response, next: NextFunction) {
		try {
			const doctor: Doctor = req.body;
			doctor.clinics = doctor.clinics.map(string => new ObjectId(string));
			const { _id, ...values } = doctor;

			const updateResponse = await DoctorsDAO.update(
				new ObjectId(_id),
				values
			);

			if (updateResponse.hasOwnProperty('error')) {
				res.status(400).json(updateResponse);
			}

			if ((updateResponse as UpdateWriteOpResult).modifiedCount === 0) {
				throw new Error('unable to update doctor');
			}

			const doctors = await DoctorsDAO.getAll();

			res.json(doctors);
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiDelete(req: Request, res: Response, next: NextFunction) {
		try {
			let id = new ObjectId(req.params.id);
			await VisitsDAO.deleteVisitsByDoctorId(id);
			await DoctorsDAO.delete(id);
			const doctors = await DoctorsDAO.getAll();
			res.json(doctors);
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async getSpecialties(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const specialties = await DoctorsDAO.getSpecialties();
			res.json(specialties);
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
