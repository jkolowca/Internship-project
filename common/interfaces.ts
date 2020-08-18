

export interface Clinic {
	_id: string;
	name: string;
	address: Address;
}

// export interface ClinicAdd {
// 	_id?: ObjectId;
// 	name: string;
// 	address: Address;
// }


export interface Address {
	_id?: string;
	city: string;
	streetAddress: string;
	apartment?: string;
}

// export interface AddressAdd {
// 	_id?: ObjectId;
// 	city: string;
// 	street: string;
// 	apartment?: string;
// }
export interface Doctor {
	_id: string;
	name: string;
	surname: string;
	specialties: string[];
	clinics: string[];
}


// export interface DoctorAdd {
// 	_id?: ObjectId;
// 	name: string;
// 	surname: string;
// 	specialties: string[];
// 	clinics: ObjectId[];
// }


export interface Appointment {
	_id: string;
	name: string;
	surname: string;
	email: string;
	reason?: string;
}



// export interface AppointmentAdd {
// 	_id?: ObjectId;
// 	name: string;
// 	surname: string;
// 	email: string;
// 	reason?: string;
// }



export interface Visit {
	_id: string;
	startDate: Date;
	endDate: Date;
	clinic: Clinic;
	doctor: Doctor;
	appointment?: Appointment;
}

// export interface VisitAdd {
// 	_id?: ObjectId;
// 	startDate: Date;
// 	endDate: Date;
// 	clinic: ObjectId;
// 	doctor: ObjectId;
// 	appointment?: Appointment;
// }


export interface VisitCount {
	_id: string;
	count: number;
}


// export interface UserAdd {
// 	_id?: ObjectId;
// 	name: string;
// 	surname: string;
// 	email: string;
// 	password: string;
// 	accountType: string;
// 	doctorId?: ObjectId;
// }
export interface User {
	_id: string;
	name: string;
	surname: string;
	email: string;
	password: string;
	accountType: string;
	doctorId?: string;
}

