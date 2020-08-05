import { ObjectId } from 'mongodb';

export interface Clinic {
	_id?: ObjectId;
	name: string;
	city: string;
	streetAddress: string;
	apartment: string;
}
