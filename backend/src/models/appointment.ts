import { ObjectId } from 'mongodb';

export interface Appointment {
	_id: ObjectId;
	name: string;
	surname: string;
	email: string;
	reason?: string;
}
