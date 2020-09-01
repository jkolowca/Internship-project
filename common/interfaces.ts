import { ObjectId } from 'mongodb';

interface IdInterface {
	_id: string;
}

interface ObjectIdInterface {
	_id?: ObjectId;
}

export interface Address {
	city: string;
	streetAddress: string;
	apartment?: string;
}

export interface ClinicData {
	name: string;
	address: Address;
}

export interface Clinic extends ClinicData, IdInterface {}
export interface ClinicDB extends ClinicData, ObjectIdInterface {}

export interface DoctorData {
	name: string;
	surname: string;
	specialties: string[];
}

export interface Doctor extends DoctorData, IdInterface {
	clinics: string[];
}

export interface DoctorDB extends DoctorData, ObjectIdInterface {
	clinics: ObjectId[];
}

export interface AppointmentData {
	name: string;
	surname: string;
	reason?: string;
}

export interface Appointment extends AppointmentData, IdInterface {}
export interface AppointmentDB extends AppointmentData, ObjectIdInterface {}

export interface VisitData {
	startDate: Date;
	endDate: Date;
	appointment?: Appointment;
}

export interface VisitAggregate extends IdInterface {
	startDate: Date;
	endDate: Date;
	appointment?: Appointment;
	clinic: Clinic;
	doctor: Doctor;
}

export interface Visit extends VisitData, IdInterface {
	clinic: string;
	doctor: string;
}
export interface VisitDB extends VisitData, ObjectIdInterface {
	clinic: ObjectId;
	doctor: ObjectId;
}

export interface UserInfo {
	name: string;
	surname: string;
	email: string;
	accountType: string;
}

export interface UserData extends UserInfo {
	password: string;
}

export interface User extends UserData, IdInterface {
	doctorId?: string;
}
export interface UserDB extends ObjectIdInterface, UserData {
	doctorId?: ObjectId;
}
