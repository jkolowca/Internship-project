import { Router } from 'express';
import { VisitsCtrl } from './visits.controller';

const router = Router();

router.route('/').get(VisitsCtrl.apiFind).post(VisitsCtrl.apiAdd);
router.route('/visit/:id').patch(VisitsCtrl.apiUpdate);
router.route('/date').get(VisitsCtrl.apiGetDates);

export default router;
