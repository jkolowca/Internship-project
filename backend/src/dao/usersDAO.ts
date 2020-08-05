import { Collection, MongoClient, Cursor, ObjectId } from 'mongodb';
import { User } from '../models';
let usersCollection: Collection<any>;

export class UsersDAO {
	static async injectDB(conn: MongoClient) {
		if (usersCollection) {
			return;
		}
		try {
			usersCollection = conn.db('registration').collection('users');
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in usersDAO: ${e}`
			);
		}
	}

	static async getAll() {
		let cursor: Cursor<User>;
		try {
			cursor = usersCollection.find();
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return [];
		}

		try {
			const users = await cursor.toArray();

			return users;
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return [];
		}
	}

	static async getById(id: ObjectId) {
		try {
			return await usersCollection.findOne({ _id: id });
		} catch (e) {
			console.error(`Something went wrong in usersDAO getById: ${e}`);
			return { usersList: [] };
		}
	}

	static async getByEmail(email: String) {
		try {
			return await usersCollection.findOne({ email: email });
		} catch (e) {
			console.error(`Something went wrong in usersDAO getById: ${e}`);
			return { usersList: [] };
		}
	}

	static async add(user: User) {
		try {
			return await usersCollection.insertOne(user);
		} catch (e) {
			console.error(`Unable to post user: ${e}`);
			return {
				error: e,
			};
		}
	}
}
