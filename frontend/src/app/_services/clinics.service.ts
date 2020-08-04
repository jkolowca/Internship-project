import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Clinic } from '../_models/interfaces';
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
			.pipe(catchError(this.handleError));
	}

	getCities(): Observable<string[]> {
		return this.http
			.get<string[]>(`${this.clinicsUrl}cities`, this.httpOptions)
			.pipe(catchError(this.handleError));
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
				catchError(this.handleError)
			);
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
