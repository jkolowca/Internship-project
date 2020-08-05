import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Doctor, Clinic } from '../_models/interfaces';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class DoctorsService {
	private doctorsUrl = 'http://localhost:5000/doctors';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient) {}

	getAllDoctors(): Observable<Doctor[]> {
		return this.http
			.get<Doctor[]>(this.doctorsUrl, this.httpOptions)
			.pipe(catchError(this.handleError<Doctor[]>('getAll', [])));
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
			.pipe(
				tap(res => console.log(`Doctor addition status ${res.status}`)),
				catchError(this.handleError<Doctor>('add'))
			);
	}

	updateDoctor(doctor: Doctor): Observable<any> {
		return this.http
			.put<Doctor[]>(this.doctorsUrl, doctor, this.httpOptions)
			.pipe(catchError(this.handleError<Doctor>('add')));
	}

	getById(id: string): Observable<Doctor> {
		return this.http
			.get<Doctor>(`${this.doctorsUrl}/doctor/${id}`, this.httpOptions)
			.pipe(catchError(this.handleError<Doctor>('getAll')));
	}

	deleteDoctor(id: string): Observable<Doctor[]> {
		const url = `${this.doctorsUrl}/doctor/${id}`;
		return this.http
			.delete<Doctor[]>(url, this.httpOptions)
			.pipe(catchError(this.handleError<Doctor[]>('deleteList')));
	}

	getClinics(id: string): Observable<Clinic[]> {
		return this.http
			.get<Clinic[]>(
				`${this.doctorsUrl}/doctor/${id}/clinics`,
				this.httpOptions
			)
			.pipe(catchError(this.handleError<Clinic[]>('getAll')));
	}

	getSpecialties(): Observable<string[]> {
		return this.http
			.get<string[]>(`${this.doctorsUrl}/specialties`, this.httpOptions)
			.pipe(catchError(this.handleError<string[]>('getSpec')));
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
