import { Router } from 'express';
import { DoctorsCtrl } from './doctors.controller';

const router = Router();

router.route('/').get(DoctorsCtrl.apiGetAll).post(DoctorsCtrl.apiAdd);
router
	.route('/:id')
	.get(DoctorsCtrl.apiGetById)
	.put(DoctorsCtrl.apiUpdate)
	.delete(DoctorsCtrl.apiDelete);

export default router;
