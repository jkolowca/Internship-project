import { ObjectId } from 'mongodb';
export interface Visit {
	_id?: ObjectId;
	startDate: Date;
	endDate: Date;
	clinic: ObjectId;
	doctor: ObjectId;
	appointment?: {
		name: string;
		surname: string;
		email: string;
		reason?: string;
	};
}
