import { Request, Response, NextFunction } from 'express';
import { UsersDAO } from '../dao/usersDAO';
import { ObjectId } from 'mongodb';

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

	static async apiAdd(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, surname,email, password, accountType} = req.body;

			await UsersDAO.add(name, surname, email, password, accountType);

			const updated = await UsersDAO.getAll();

			res.json({ status: 'success', users: updated });
		} catch (e) {
			res.status(500).json({ e });
		}
	}
}
