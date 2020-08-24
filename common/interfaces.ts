import { ObjectId } from 'mongodb';

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
	reason?: string;
}

export interface Visit extends VisitData {
	_id: string;
}

export interface VisitData {
	startDate: Date;
	endDate: Date;
	clinic: string;
	doctor: string;
	appointment?: Appointment;
}

export interface VisitAggregate {
	_id: string;
	startDate: Date;
	endDate: Date;
	clinic: Clinic;
	doctor: Doctor;
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

export interface DoctorDB {
	_id?: ObjectId;
	name: string;
	surname: string;
	specialties: string[];
	clinics: ObjectId[];
}

export interface UserDB {
	_id?: ObjectId;
	name: string;
	surname: string;
	email: string;
	password: string;
	accountType: string;
	doctorId?: ObjectId;
}

export interface VisitDB {
	_id?: ObjectId;
	startDate: Date;
	endDate: Date;
	clinic: ObjectId;
	doctor: ObjectId;
	appointment?: AppointmentDB;
}

export interface ClinicDB {
	_id?: ObjectId;
	name: string;
	address: AddressDB;
}
export interface AppointmentDB {
	_id: ObjectId;
	name: string;
	surname: string;
	email: string;
	reason?: string;
}

export interface AddressDB {
	_id?: ObjectId;
	city: string;
	street: string;
	apartment: string;
}
