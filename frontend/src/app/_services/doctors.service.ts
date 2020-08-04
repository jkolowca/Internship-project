import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Doctor, Clinic } from '../_models/interfaces';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class DoctorsService {
	private doctorsUrl = 'http://localhost:5000/doctors/';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient) {}

	getAllDoctors(): Observable<Doctor[]> {
		return this.http
			.get<Doctor[]>(this.doctorsUrl, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	getSpecialties(): Observable<string[]> {
		return this.http
			.get<string[]>(`${this.doctorsUrl}spec`, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	getDoctorById(id: string): Observable<Doctor> {
		return this.http
			.get<Doctor>(`${this.doctorsUrl}${id}`, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	getDoctorClinics(id: string): Observable<Clinic[]> {
		return this.http
			.get<Clinic[]>(`${this.doctorsUrl}${id}/clinics`, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	addDoctor(
		name: string,
		surname: string,
		specialties: string[],
		clinics: string[]
	): Observable<any> {
		return this.http
			.post<Doctor>(
				this.doctorsUrl,
				{ name, surname, specialties, clinics },
				this.httpOptions
			)
			.pipe(
				tap((newDoctor: Doctor) =>
					console.log(`added doctor id=${newDoctor._id}`)
				),
				catchError(this.handleError)
			);
	}

	updateDoctor(doctor: Doctor): Observable<any> {
		return this.http
			.put<Doctor>(
				`${this.doctorsUrl}${doctor._id}`,
				doctor,
				this.httpOptions
			)
			.pipe(
				tap((newDoctor: Doctor) =>
					console.log(`updated doctor id=${newDoctor._id}`)
				),
				catchError(this.handleError)
			);
	}

	deleteDoctor(id: string): Observable<Doctor[]> {
		const url = `${this.doctorsUrl}${id}`;
		return this.http
			.delete<Doctor[]>(url, this.httpOptions)
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
