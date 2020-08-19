import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinic, ClinicData } from '../../../../../common/interfaces';

@Injectable()
export class ClinicsService {
	private clinicsUrl = 'http://localhost:5000/clinics';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private http: HttpClient) {}

	getAllClinics(): Observable<Clinic[]> {
		return this.http.get<Clinic[]>(this.clinicsUrl, this.httpOptions);
	}

	addClinic(clinic: ClinicData): Observable<{ status: string }> {
		return this.http.post<{ status: string }>(this.clinicsUrl, clinic, this.httpOptions);
	}

	getCities(): Observable<string[]> {
		return this.http.get<string[]>(`${this.clinicsUrl}/cities`, this.httpOptions);
	}

	deleteClinic(id: string): Observable<Clinic[]> {
		const url = `${this.clinicsUrl}/clinic/${id}`;
		return this.http.delete<Clinic[]>(url, this.httpOptions);
	}
}
