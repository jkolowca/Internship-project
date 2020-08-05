import { Router } from 'express';
import { UsersCtrl } from './users.controller';

const router = Router();
router.route('/').get(UsersCtrl.apiGetAll);
router.route('/:id').get(UsersCtrl.apiGetById);
router.route('/signin').post(UsersCtrl.apiLogin);
router.route('/register-user').post(UsersCtrl.apiAddClient);
export default router;
