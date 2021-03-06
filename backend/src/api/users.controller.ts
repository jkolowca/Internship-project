import { Request, Response, NextFunction } from 'express';
import { UsersDAO } from '../dao/usersDAO';
import { UserDB } from '../../../common/interfaces';
import * as bcrypt from 'bcryptjs';
import * as jbw from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export class UsersCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const users = await UsersDAO.getAll();
		res.json(users);
	}

	static async apiGetById(req: Request, res: Response, next: NextFunction) {
		try {
			let id = new ObjectId(req.params.id);
			let projection = { password: 0 };
			let user = await UsersDAO.getById(id, projection);
			if (!user) {
				res.status(404).json({ error: 'Not found' });
				return;
			}

			res.json(user);
		} catch (e) {
			console.log(`api, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiLogin(req: Request, res: Response, next: NextFunction) {
		try {
			await UsersDAO.getByEmail(req.body.email)
				.then(user => {
					if (!user) {
						return res.status(401).json({
							message: 'Not found'
						});
					}
					return bcrypt
						.compare(req.body.password, user.password)
						.then(response => {
							if (!response) {
								return res.status(401).json({
									message: 'Authentication failed'
								});
							}
							let jwtToken = jbw.sign(
								{
									email: user.email,
									userId: user._id
								},
								'longer-secret-is-better',
								{
									expiresIn: '1h'
								}
							);
							res.status(200).json({
								token: jwtToken,
								expiresIn: 3600,
								user: user
							});
						})
						.catch(() => {
							return res.status(401).json({
								message: 'Authentication failed'
							});
						});
				})
				.catch(err => console.error(err));
		} finally {
		}
	}

	static async apiAddUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user: UserDB = req.body;
			user.password = await bcrypt.hash(user.password, 10);
			if (!user.accountType) user.accountType = 'patient';

			await UsersDAO.add(user);

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
