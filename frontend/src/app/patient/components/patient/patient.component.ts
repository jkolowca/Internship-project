import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../../../../../common/interfaces';

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
})
export class PatientComponent implements OnInit {
	patient: User;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.patient = this.authService.user;
	}
}
