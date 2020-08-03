import { Request, Response, NextFunction } from 'express';
import { DoctorsDAO } from '../dao/doctorsDAO';
import { VisitsDAO } from '../dao/visitsDAO';
import { ObjectId, UpdateWriteOpResult } from 'mongodb';
import { ClinicsDAO } from '../dao/clinicsDAO';

export class DoctorsCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const { doctorsList } = await DoctorsDAO.getAll();
		res.json(doctorsList);
	}

	static async apiGetById(req: Request, res: Response, next: NextFunction) {
		try {
			let id = req.params.id;
			let doctor = await DoctorsDAO.getById(new ObjectId(id));
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
			let id = req.params.id;
			let { clinics } = await DoctorsDAO.getClinics(new ObjectId(id));
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
			const { name, surname, specialties, clinics } = req.body;

			await DoctorsDAO.add(name, surname, specialties, clinics);

			const updated = await DoctorsDAO.getAll();

			res.json({ status: 'success', doctors: updated });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiUpdate(req: Request, res: Response, next: NextFunction) {
		try {
			let id = req.params.id;
			const { name, surname, specialties, clinics } = req.body;

			const updateResponse = await DoctorsDAO.update(
				new ObjectId(id),
				name,
				surname,
				specialties,
				clinics
			);

			if (updateResponse.hasOwnProperty('error')) {
				res.status(400).json(updateResponse);
			}

			if ((updateResponse as UpdateWriteOpResult).modifiedCount === 0) {
				throw new Error('unable to update task');
			}

			const doctors = await DoctorsDAO.getAll();

			res.json({ doctors });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiDelete(req: Request, res: Response, next: NextFunction) {
		try {
			let id = req.params.id;
			await VisitsDAO.deleteVisitsByDoctorId(new ObjectId(id));
			await DoctorsDAO.delete(new ObjectId(id));
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
			const specialtiesList = await DoctorsDAO.getSpecialties();
			res.json(specialtiesList);
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
