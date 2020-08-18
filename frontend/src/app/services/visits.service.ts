import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitCount, Visit, Appointment } from '../../../../common/interfaces';


@Injectable({
	providedIn: 'root',
})
export class VisitsService {
	private visitsUrl = 'http://localhost:5000/visits';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient) {}

	getAll(): Observable<{
		visits: Visit[];
		dates: VisitCount[];
		visitsCount: number;
	}> {
		return this.http.get<{
			visits: Visit[];
			dates: VisitCount[];
			visitsCount: number;
		}>(this.visitsUrl);
	}

	findVisits(
		query: Object
	): Observable<{
		visits: Visit[];
		visitsCount: number;
	}> {
		let params: HttpParams = new HttpParams();
		for (let key in query) {
			params = params.append(key.toString(), query[key]);
		}
		return this.http.get<{ visits: Visit[]; visitsCount: number }>(
			this.visitsUrl,
			{
				params: params,
			}
		);
	}

	addVisit(
		startDate: Date,
		endDate: Date,
		clinic: string,
		doctor: string
	): Observable<any> {
		return this.http.post<{ status: string }>(`${this.visitsUrl}`, {
			startDate,
			endDate,
			clinic,
			doctor,
		});
	}

	editVisit(visit: Visit): Observable<any> {
		return this.http.patch(`${this.visitsUrl}/visit/${visit._id}`, visit);
	}

	register(id: string, appointment: Appointment): Observable<any> {
		return this.http.patch(`${this.visitsUrl}/visit/${id}`, {
			appointment,
		});
	}

	deleteAppointment(id: string): Observable<any> {
		return this.http.patch(`${this.visitsUrl}/visit/${id}/delete`, id);
	}

	deleteVisit(id: string): Observable<{ status: string }> {
		const url = `${this.visitsUrl}/visit/${id}`;
		return this.http.delete<{ status: string }>(url, this.httpOptions);
	}
}
