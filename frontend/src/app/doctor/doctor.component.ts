import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/interfaces';
import { AuthService } from '../services';
import { ErrorPanelComponent } from '../error-panel/error-panel.component';

@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
})
export class DoctorComponent implements OnInit {
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	doctor: User;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.getCurrentUserProfile().subscribe(
			doctor => (this.doctor = doctor),
			e => this.errorPanel.displayError(e)
		);
	}
	logout() {
		this.authService.doLogout();
	}
}
