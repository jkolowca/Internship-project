import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { User } from '../models/interfaces';

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
})
export class PatientComponent implements OnInit {
	patient: User;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService
			.getCurrentUserProfile()
			.subscribe(patient => (this.patient = patient));
	}
	logout() {
		this.authService.doLogout();
	}
}
