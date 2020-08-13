import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services';

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
}
