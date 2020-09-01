import { Collection, MongoClient, Cursor, ObjectId } from 'mongodb';
import { UserDB } from '../../../common/interfaces';
let usersCollection: Collection<UserDB>;

export class UsersDAO {
	static async injectDB(conn: MongoClient) {
		if (usersCollection) {
			return;
		}
		try {
			usersCollection = conn.db('registration').collection('users');
		} catch (e) {
			console.error(`Unable to establish a collection handle in usersDAO: ${e}`);
		}
	}

	static async drop() {
		try {
			usersCollection.drop();
		} catch (e) {
			console.error(`UsersDAO: drop ${e}`);
		}
	}

	static async getAll() {
		let cursor: Cursor<UserDB>;
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
			console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
			return [];
		}
	}

	static async getById(_id: ObjectId, projection: Object) {
		try {
			return await usersCollection.findOne({ _id }, { projection });
		} catch (e) {
			console.error(`Something went wrong in usersDAO getById: ${e}`);
			return undefined;
		}
	}

	static async getByEmail(email: string) {
		try {
			return await usersCollection.findOne({ email });
		} catch (e) {
			console.error(`Something went wrong in usersDAO getById: ${e}`);
			return undefined;
		}
	}

	static async add(user: UserDB) {
		try {
			return await usersCollection.insertOne(user);
		} catch (e) {
			console.error(`Unable to post user: ${e}`);
			return {
				error: e
			};
		}
	}

	static async addMany(users: UserDB[]) {
		try {
			return await usersCollection.insertMany(users);
		} catch (e) {
			console.error(`Unable to post user: ${e}`);
			return {
				error: e
			};
		}
	}
}
