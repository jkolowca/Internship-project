import { Router } from 'express';
import { VisitsCtrl } from './visits.controller';

const router = Router();

router.route('/').get(VisitsCtrl.apiFind).post(VisitsCtrl.apiAdd);
router.route('/visit/:id').patch(VisitsCtrl.apiUpdate);
router.route('/visit/:id/delete').patch(VisitsCtrl.apiDeleteAppointment);

export default router;
