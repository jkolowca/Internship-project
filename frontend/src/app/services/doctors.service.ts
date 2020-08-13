import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { Doctor, Clinic } from '../models/interfaces';
import { catchError } from 'rxjs/operators';

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
		return this.http
			.get<Doctor[]>(this.doctorsUrl, this.httpOptions)
			.pipe(catchError(this.handleError));
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
		return this.http
			.post<{ status: string }>(
				this.doctorsUrl,
				{ name, surname, specialties, clinics },
				this.httpOptions
			)
			.pipe(catchError(this.handleError));
	}

	updateDoctor(doctor: Doctor): Observable<any> {
		return this.http
			.put<Doctor[]>(this.doctorsUrl, doctor, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	getById(id: string): Observable<Doctor> {
		return this.http
			.get<Doctor>(`${this.doctorsUrl}/doctor/${id}`, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	deleteDoctor(id: string): Observable<Doctor[]> {
		const url = `${this.doctorsUrl}/doctor/${id}`;
		return this.http
			.delete<Doctor[]>(url, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	getClinics(id: string): Observable<Clinic[]> {
		return this.http
			.get<Clinic[]>(
				`${this.doctorsUrl}/doctor/${id}/clinics`,
				this.httpOptions
			)
			.pipe(catchError(this.handleError));
	}

	getSpecialties(): Observable<string[]> {
		return this.http
			.get<string[]>(`${this.doctorsUrl}/specialties`, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse) {
		let msg = '';
		if (error.error instanceof ErrorEvent) {
			msg = `Error: ${error.error.message}`;
		} else {
			msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(msg);
	}
}
