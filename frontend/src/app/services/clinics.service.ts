import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinic } from '../../../../common/interfaces';



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
			.get<Clinic[]>(this.clinicsUrl, this.httpOptions);
	}

	getCities(): Observable<string[]> {
		return this.http
			.get<string[]>(`${this.clinicsUrl}cities`, this.httpOptions);
	}

	addClinic(
		name: string,
		address: object,
	): Observable<any> {
		return this.http
			.post<Clinic>(
				this.clinicsUrl,
				{ name, address },
				this.httpOptions
			); 
	}

	deleteClinic(id: string): Observable<Clinic[]> {
		const url = `${this.clinicsUrl}/clinic/${id}`;
		return this.http
			.delete<Clinic[]>(url, this.httpOptions);
	}

}
