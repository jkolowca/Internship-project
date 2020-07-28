import { Router } from 'express';
import { ClinicsCtrl } from './clinics.controller';

const router = Router();

router.route('/').get(ClinicsCtrl.apiGetAll).post(ClinicsCtrl.apiAdd);

export default router;
