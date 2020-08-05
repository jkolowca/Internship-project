import { Router } from 'express';
import { DoctorsCtrl } from './doctors.controller';

const router = Router();
router
	.route('/')
	.get(DoctorsCtrl.apiGetAll)
	.post(DoctorsCtrl.apiAdd)
	.put(DoctorsCtrl.apiUpdate);
router
	.route('/doctor/:id')
	.get(DoctorsCtrl.apiGetById)
	.delete(DoctorsCtrl.apiDelete);
router.route('/doctor/:id/clinics').get(DoctorsCtrl.apiGetClinics);
router.route('/specialties').get(DoctorsCtrl.getSpecialties);
export default router;
