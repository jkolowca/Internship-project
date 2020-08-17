export interface Clinic {
	_id: string;
	name: string;
	address: Address;
}

export interface Address {
	_id?: string;
	city: string;
	streetAddress: string;
	apartment?: string;
}

export interface Doctor {
	_id: string;
	name: string;
	surname: string;
	specialties: string[];
	clinics: string[];
}

export interface Appointment {
	_id: string;
	name: string;
	surname: string;
	email: string;
	reason?: string;
}

export interface Visit {
	_id: string;
	startDate: Date;
	endDate: Date;
	clinic: Clinic;
	doctor: Doctor;
	appointment?: Appointment;
}

export interface VisitCount {
	_id: string;
	count: number;
}

export interface User {
	_id: string;
	name: string;
	surname: string;
	email: string;
	password: string;
	accountType: string;
	doctorId?: string;
}
