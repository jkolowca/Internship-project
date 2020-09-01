import { ObjectId } from 'mongodb';

type Id = ObjectId | string;

export interface Address {
	city: string;
	streetAddress: string;
	apartment?: string;
}

export interface ClinicData<T extends Id> {
	_id: T;
	name: string;
	address: Address;
}

export interface Clinic extends ClinicData<string> {}
export interface ClinicDB extends ClinicData<ObjectId> {}

export interface DoctorData<T extends Id> {
	_id: T;
	name: string;
	surname: string;
	specialties: string[];
	clinics: T[];
}

export interface Doctor extends DoctorData<string> {}
export interface DoctorDB extends DoctorData<ObjectId> {}

export interface AppointmentData<T extends Id> {
	_id: T;
	name: string;
	surname: string;
	reason?: string;
}

export interface Appointment extends AppointmentData<string> {}
export interface AppointmentDB extends AppointmentData<ObjectId> {}

export interface VisitData<T extends Id> {
	_id?: T;
	startDate: Date;
	endDate: Date;
	appointment?: Appointment;
	clinic: T;
	doctor: T;
}

export interface VisitAggregate {
	_id: string;
	startDate: Date;
	endDate: Date;
	appointment?: Appointment;
	clinic: Clinic;
	doctor: Doctor;
}

export interface Visit extends VisitData<string> {}
export interface VisitDB extends VisitData<ObjectId> {}

export interface UserData<T extends Id> {
	_id: T;
	name: string;
	surname: string;
	email: string;
	accountType: string;
	password: string;
	doctorId?: T;
}

export interface User extends UserData<string> {}
export interface UserDB extends UserData<ObjectId> {}
