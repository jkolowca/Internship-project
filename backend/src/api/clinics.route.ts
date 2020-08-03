import { Router } from 'express';
import { ClinicsCtrl } from './clinics.controller';

const router = Router();
router.route('/cities').get(ClinicsCtrl.getCities);
router.route('/').get(ClinicsCtrl.apiGetAll).post(ClinicsCtrl.apiAdd);

export default router;
