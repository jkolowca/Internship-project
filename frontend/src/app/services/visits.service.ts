import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Visit, VisitCount, Appointment, Query } from '../models/interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class VisitsService {
	private visitsUrl = 'http://localhost:5000/visits';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};
	query: Query;

	constructor(private http: HttpClient) {}

	getFiltered(): Observable<Visit[]> {
		return this.http
		.get<Visit[]>(`${this.visitsUrl}/${this.query.city[0]}/${this.query.specialty}/${this.query.startDate}/${this.query.endDate}`)
		.pipe(catchError(this.handleError));
	}


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
			.post<{ status: string }>(`${this.visitsUrl}`, {
				startDate,
				endDate,
				clinic,
				doctor,
			})
			.pipe(catchError(this.handleError));
	}

	editVisit(visit: Visit): Observable<any> {
		return this.http
			.patch(`${this.visitsUrl}/visit/${visit._id}`, visit)
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

	register(id: string, appointment: Appointment): Observable<any> {
		return this.http
			.patch(`${this.visitsUrl}/visit/${id}`, { appointment })
			.pipe(catchError(this.handleError));
	}

	deleteAppointment(id: string): Observable<any> {
		return this.http
			.patch(`${this.visitsUrl}/visit/${id}/delete`, id)
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
