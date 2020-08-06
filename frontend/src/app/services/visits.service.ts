import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpParams,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Visit, VisitCount, Appointment } from '../models/interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class VisitsService {
	private visitsUrl = 'http://localhost:5000/visits';

	constructor(private http: HttpClient) {}

	getAll(): Observable<Visit[]> {
		return this.http
			.get<Visit[]>(this.visitsUrl)
			.pipe(catchError(this.handleError));
	}

	findVisits(query: Object): Observable<Visit[]> {
		let params: HttpParams = new HttpParams();
		for (let key in query) {
			params = params.append(key.toString(), query[key]);
		}
		return this.http
			.get<Visit[]>(this.visitsUrl, { params: params })
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

	getVisitDates(query: Object): Observable<any> {
		let params: HttpParams = new HttpParams();
		for (let key in query) {
			params = params.append(key.toString(), query[key]);
		}
		return this.http
			.get<VisitCount[]>(`${this.visitsUrl}/date`, { params: params })
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
