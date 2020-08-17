import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorPanelComponent } from '../shared/error-panel/error-panel.component';
import { User, Doctor } from 'src/app/models/interfaces';
import { AuthService, DoctorsService } from 'src/app/services';
import { switchMap } from 'rxjs/operators';
@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
})
export class DoctorComponent implements OnInit {
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	user: User;
	doctor: Doctor;
	constructor(
		private authService: AuthService,
		private doctorsService: DoctorsService
	) {}

	ngOnInit(): void {
		this.authService
			.getCurrentUserProfile()
			.pipe(
				switchMap(user => {
					this.user = user;
					return this.doctorsService.getById(user.doctorId);
				})
			)
			.subscribe(
				doctor => {
					this.doctorsService.setCurrentDoctor(doctor);
					this.doctor = doctor;
				},
				e => this.errorPanel.displayError(e)
			);
	}
}
