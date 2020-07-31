import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Doctor } from '../interfaces';
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
			.pipe(catchError(this.handleError<Doctor[]>('getAll', [])));
	}

	getDoctorById(id: string): Observable<Doctor> {
		return this.http
			.get<Doctor>(`${this.doctorsUrl}${id}`, this.httpOptions)
			.pipe(catchError(this.handleError<Doctor>('getAll')));
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
				catchError(this.handleError<Doctor>('add'))
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
				catchError(this.handleError<Doctor>('add'))
			);
	}

	deleteDoctor(id: string): Observable<Doctor[]> {
		const url = `${this.doctorsUrl}${id}`;
		return this.http
			.delete<Doctor[]>(url, this.httpOptions)
			.pipe(catchError(this.handleError<Doctor[]>('deleteList')));
	}

	private handleError<T>(
		operation?: string,
		result?: T
	): (a: any) => Observable<T> {
		return (error: any): Observable<T> => {
			console.error(`${error} at: ${operation}`);
			return of(result as T);
		};
	}
}
