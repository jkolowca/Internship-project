export interface Clinic extends ClinicData {
	_id: string;
}

export interface ClinicData {
	name: string;
	address: Address;
}

export interface Address {
	city: string;
	streetAddress: string;
	apartment?: string;
}

export interface Doctor extends DoctorData {
	_id: string;
}

export interface DoctorData {
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

export interface Visit extends VisitData {
	_id: string;
}

export interface VisitData {
	startDate: Date;
	endDate: Date;
	clinic: Clinic | string;
	doctor: Doctor | string;
	appointment?: Appointment;
}

export interface User extends UserData {
	_id: string;
}

export interface UserData {
	name: string;
	surname: string;
	email: string;
	password: string;
	accountType: string;
	doctorId?: string;
}
