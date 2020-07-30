import { Collection, MongoClient, Cursor, ObjectId } from 'mongodb';
let users: Collection<any>;

export class UsersDAO {
	static async injectDB(conn: MongoClient) {
		if (users) {
			return;
		}
		try {
			users = conn.db('registration').collection('users');
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in usersDAO: ${e}`
			);
		}
	}

	static async getAll() {
		let cursor: Cursor;
		try {
			cursor = users.find();
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { usersList: [] };
		}

		try {
			const usersList = await cursor.toArray();

			return { usersList };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { usersList: [] };
		}
	}

	static async getById(id: ObjectId) {
		try {
			return await users.findOne({ _id: id });
		} catch (e) {
			console.error(`Something went wrong in usersDAO getById: ${e}`);
			return { usersList: [] };
		}
	}

	static async add(
	    name: string,
	    surname: string,
	    email: string,
		password: string,
		accountType: string
	) {
	    try {
	        const usersDoc = {
	            name,
	            surname,
	            email,
				password,
				accountType
	        };

	        return await users.insertOne(usersDoc);
	    } catch (e) {
	        console.error(`Unable to post user: ${e}`);
	        return {
	            error: e
	        };
	    }
	}
}

/**
 * A User
 * @typedef User
 * @property {ObjectId} _id
 * @property {string} name
 * @property {string} surname
 * @property {string} password
 * @property {string} accountType
 */
