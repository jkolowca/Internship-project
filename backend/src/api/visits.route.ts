import { Router } from 'express';
import { VisitsCtrl } from './visits.controller';
import { VisitsDAO } from '../dao/visitsDAO';

const router = Router();

router.route('/').get(VisitsCtrl.apiGetAll).post(VisitsCtrl.apiAdd);
router.route('/date').get(VisitsCtrl.apiGetDates);
router.route('/visit/:id').patch(VisitsCtrl.apiUpdate);

export default router;
