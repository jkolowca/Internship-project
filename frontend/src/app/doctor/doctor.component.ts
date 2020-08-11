import { Component, OnInit } from '@angular/core';
import { User } from '../models/interfaces';
import { AuthService } from '../services';

@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
})
export class DoctorComponent implements OnInit {
	doctor: User;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService
			.getCurrentUserProfile()
			.subscribe(doctor => (this.doctor = doctor));
	}
	logout() {
		this.authService.doLogout();
	}
}
