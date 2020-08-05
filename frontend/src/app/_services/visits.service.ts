import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Visit, VisitCount } from '../_models/interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class VisitsService {
	private visitsUrl = 'http://localhost:5000/visits';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient) {}

	getAll(): Observable<Visit[]> {
		return this.http
			.get<Visit[]>(this.visitsUrl)
			.pipe(catchError(this.handleError));
	}

	addVisit(
		startDate: Date,
		endDate: Date,
		clinic: string,
		doctor: string
	): Observable<any> {
		return this.http
			.post<Visit>(`${this.visitsUrl}`, {
				startDate,
				endDate,
				clinic,
				doctor,
			})
			.pipe(catchError(this.handleError));
	}

	editVisit(visit: Visit): Observable<any> {
		return this.http
			.patch(`${this.visitsUrl}/visit/${visit._id}`, {
				startDate: visit.startDate,
				endDate: visit.endDate,
				clinic: visit.clinic._id,
			})
			.pipe(catchError(this.handleError));
	}

	getVisitDates(): Observable<any> {
		return this.http
			.get<VisitCount[]>(`${this.visitsUrl}/date`)
			.pipe(catchError(this.handleError));
	}

	getRegisteredVisits(id: string): Observable<any> {
		return this.http
			.get<VisitCount[]>(`${this.visitsUrl}/register/${id}`)
			.pipe(catchError(this.handleError));
	}


	register(id: string, pacient: object): Observable<any> {
		return this.http
			.patch(`${this.visitsUrl}/visit/${id}`, pacient)
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
