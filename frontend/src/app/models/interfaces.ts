export interface Clinic {
	_id: string;
	name: string;
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

export interface Pacient {
	_id: string;
	name: string;
	surname: string;
	email: string;
	visits: string[];
	password: string;
}

export interface Appointment {
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
	accountType?: string;
}
