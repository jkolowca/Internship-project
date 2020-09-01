import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Doctor, Clinic, DoctorData } from '../../../../../common/interfaces';

@Injectable()
export class DoctorsService {
	private doctorsUrl = 'http://localhost:5000/doctors';
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	currentDoctor = new BehaviorSubject<Doctor>(<Doctor>{});

	constructor(private http: HttpClient) {}
	setCurrentDoctor(doctor: Doctor) {
		this.currentDoctor.next(doctor);
	}

	getAllDoctors(): Observable<Doctor[]> {
		return this.http.get<Doctor[]>(this.doctorsUrl, this.httpOptions);
	}

	addDoctor(doctor: DoctorData<string>): Observable<{ status: string }> {
		return this.http.post<{ status: string }>(this.doctorsUrl, doctor, this.httpOptions);
	}

	updateDoctor(doctor: Doctor): Observable<{ status: string }> {
		return this.http.put<{ status: string }>(this.doctorsUrl, doctor, this.httpOptions);
	}

	getById(id: string): Observable<Doctor> {
		return this.http.get<Doctor>(`${this.doctorsUrl}/doctor/${id}`, this.httpOptions);
	}

	deleteDoctor(id: string): Observable<{ status: string }> {
		const url = `${this.doctorsUrl}/doctor/${id}`;
		return this.http.delete<{ status: string }>(url, this.httpOptions);
	}

	getClinics(id: string): Observable<Clinic[]> {
		return this.http.get<Clinic[]>(`${this.doctorsUrl}/doctor/${id}/clinics`, this.httpOptions);
	}

	getSpecialties(): Observable<string[]> {
		return this.http.get<string[]>(`${this.doctorsUrl}/specialties`, this.httpOptions);
	}
}
