import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Clinic } from '../interfaces';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ClinicsService {
	private clinicsUrl = 'http://localhost:5000/clinics/';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient) {}

	getAllClinics(): Observable<Clinic[]> {
		return this.http
			.get<Clinic[]>(this.clinicsUrl, this.httpOptions)
			.pipe(catchError(this.handleError<Clinic[]>('getAll', [])));
	}

	addClinic(
		name: string,
		city: string,
		street: string,
		streetNo: string
	): Observable<any> {
		return this.http
			.post<Clinic>(
				this.clinicsUrl,
				{ name, city, street, streetNo },
				this.httpOptions
			)
			.pipe(
				tap((newClinic: Clinic) =>
					console.log(`added clinic id=${newClinic._id}`)
				),
				catchError(this.handleError<Clinic>('add'))
			);
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
