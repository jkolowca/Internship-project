import { Router } from 'express';
import { ClinicsCtrl } from './clinics.controller';

const router = Router();
router.route('/cities').get(ClinicsCtrl.apiGetCities);
router.route('/').get(ClinicsCtrl.apiGetAll).post(ClinicsCtrl.apiAdd);
router.route('/clinic/:id').delete(ClinicsCtrl.apiDelete);

export default router;
