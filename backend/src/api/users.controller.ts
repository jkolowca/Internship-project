import { Request, Response, NextFunction } from 'express';
import { UsersDAO } from '../dao/usersDAO';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcryptjs';
import * as jbw from 'jsonwebtoken';

export class UsersCtrl {
	static async apiGetAll(req: Request, res: Response, next: NextFunction) {
		const { usersList } = await UsersDAO.getAll();
		res.json(usersList);
	}

	static async apiGetById(req: Request, res: Response, next: NextFunction) {
		try {
			let id = req.params.id;
			let user = await UsersDAO.getById(new ObjectId(id));
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

	static async apiAddClient(req: Request, res: Response, next: NextFunction) {
		try {

			const password = await bcrypt.hash(req.body.password, 10);
			
			const { name, surname,email} = req.body;
			const accountType = 'client';
			await UsersDAO.add(name, surname, email, password, accountType);

			const updated = await UsersDAO.getAll();

			res.json({ status: 'success', users: updated });
		} catch (e) {
			res.status(500).json({ e });
		}
	}

	static async apiLogin(req: Request, res: Response, next: NextFunction) {
		let getUser: { email: any; _id: any; };
		try {
			await UsersDAO.getByEmail(req.body.email).then( user => {
				if (!user) {
					return res.status(401).json({
						message: "Authentication failed"
					});
				}
				getUser = user;
				return bcrypt.compare(req.body.password, user.password);
			}).then(response => {
				if (!response) {
					return res.status(401).json({
						message: "Authentication failed"
					});
				}
				let jwtToken = jbw.sign({
					email: getUser.email,
					userId: getUser._id
				}, "longer-secret-is-better", {
					expiresIn: "1h"
				});
				res.status(200).json({
					token: jwtToken,
					expiresIn: 3600,
					_id: getUser._id
				});
			}).catch(err => {
				return res.status(401).json({
					message: "Authentication failed"
				});
			});
		});
} 