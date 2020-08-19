import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit, Appointment, VisitAggregate, VisitData } from '../../../../../common/interfaces';

@Injectable()
export class VisitsService {
	private visitsUrl = 'http://localhost:5000/visits';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private http: HttpClient) {}

	findVisits(query: Object): Observable<{ visits: Visit[]; visitsCount: number }> {
		let params: HttpParams = new HttpParams();
		for (let key in query) {
			params = params.append(key.toString(), query[key]);
		}

		return this.http.get<{ visits: Visit[]; visitsCount: number }>(this.visitsUrl, {
			params: params
		});
	}

	addVisit(visit: VisitData): Observable<any> {
		return this.http.post<{ status: string }>(`${this.visitsUrl}`, visit);
	}

	editVisit(visit: VisitAggregate): Observable<any> {
		return this.http.patch(`${this.visitsUrl}/visit/${visit._id}`, visit);
	}

	register(id: string, appointment: Appointment): Observable<any> {
		return this.http.patch(`${this.visitsUrl}/visit/${id}`, {
			appointment
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
