import { Component, OnInit } from '@angular/core';
import { User, Doctor } from 'src/app/models/interfaces';
import { AuthService, DoctorsService } from 'src/app/services';
import { switchMap } from 'rxjs/operators';
@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
	styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
	user: User;
	doctor: Doctor;
	constructor(
		private authService: AuthService,
		private doctorsService: DoctorsService
	) {}

	ngOnInit(): void {
		this.doctorsService
			.getById(this.authService.user.doctorId)
			.subscribe(doctor => {
				this.doctorsService.setCurrentDoctor(doctor);
				this.doctor = doctor;
			});
	}
}
