import { Router } from 'express';
import { DoctorsCtrl } from './doctors.controller';

const router = Router();
router.route('/spec').get(DoctorsCtrl.getSpecialties);
router.route('/').get(DoctorsCtrl.apiGetAll).post(DoctorsCtrl.apiAdd);
router
	.route('/:id')
	.get(DoctorsCtrl.apiGetById)
	.put(DoctorsCtrl.apiUpdate)
	.delete(DoctorsCtrl.apiDelete);
router.route('/:id/clinics').get(DoctorsCtrl.apiGetClinics);
router.route('/spec').get(DoctorsCtrl.getSpecialties);
export default router;
