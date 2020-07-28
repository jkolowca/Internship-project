export interface Visit {
	_id: string;
	startDate: Date;
	endDate: Date;
	clinic: string;
	doctor: string;
	appointment?: {
		name: string;
		surname: string;
		email: string;
		reason?: string;
	};
}
