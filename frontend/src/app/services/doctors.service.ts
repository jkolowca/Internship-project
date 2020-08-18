import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Doctor, Clinic } from '../../../../common/interfaces';


@Injectable({
	providedIn: 'root',
})
export class DoctorsService {
	private doctorsUrl = 'http://localhost:5000/doctors';
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};
	currentDoctor = new BehaviorSubject<Doctor>(<Doctor>{});

	constructor(private http: HttpClient) {}

	getAllDoctors(): Observable<Doctor[]> {
		return this.http.get<Doctor[]>(this.doctorsUrl, this.httpOptions);
	}

	setCurrentDoctor(doctor: Doctor) {
		this.currentDoctor.next(doctor);
	}

	addDoctor(
		name: string,
		surname: string,
		specialties: string[],
		clinics: string[]
	): Observable<any> {
		return this.http.post<{ status: string }>(
			this.doctorsUrl,
			{ name, surname, specialties, clinics },
			this.httpOptions
		);
	}

	updateDoctor(doctor: Doctor): Observable<any> {
		return this.http.put<Doctor[]>(
			this.doctorsUrl,
			doctor,
			this.httpOptions
		);
	}

	getById(id: string): Observable<Doctor> {
		return this.http.get<Doctor>(
			`${this.doctorsUrl}/doctor/${id}`,
			this.httpOptions
		);
	}

	deleteDoctor(id: string): Observable<Doctor[]> {
		const url = `${this.doctorsUrl}/doctor/${id}`;
		return this.http.delete<Doctor[]>(url, this.httpOptions);
	}

	getClinics(id: string): Observable<Clinic[]> {
		return this.http.get<Clinic[]>(
			`${this.doctorsUrl}/doctor/${id}/clinics`,
			this.httpOptions
		);
	}

	getSpecialties(): Observable<string[]> {
		return this.http.get<string[]>(
			`${this.doctorsUrl}/specialties`,
			this.httpOptions
		);
	}
}
