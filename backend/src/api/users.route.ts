import { Router } from 'express';
import { UsersCtrl } from './users.controller';

const router = Router();

router.route('/').get(UsersCtrl.apiGetAll).post(UsersCtrl.apiAdd);
router
	.route('/:id')
	.get(UsersCtrl.apiGetById)
export default router;
