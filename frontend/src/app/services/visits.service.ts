import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Visit, VisitCount } from '../interfaces';
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
			.pipe(catchError(this.handleError<Visit[]>('getAll', [])));
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
			.pipe(catchError(this.handleError<Visit>('editVisit')));
	}

	getVisitDates(): Observable<any> {
		return this.http
			.get<VisitCount[]>(`${this.visitsUrl}/date`)
			.pipe(catchError(this.handleError<any>('editVisit')));
	}

	register(id: string, pacient: object): Observable<any> {
		return this.http
			.patch(`${this.visitsUrl}/visit/${id}`, pacient)
			.pipe(catchError(this.handleError<Visit>('editVisit')));
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
