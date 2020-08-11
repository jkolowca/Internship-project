import { ObjectId } from 'mongodb';
export interface User {
	_id?: ObjectId;
	name: string;
	surname: string;
	email: string;
	password: string;
	accountType: string;
	doctorId?: ObjectId;
}
