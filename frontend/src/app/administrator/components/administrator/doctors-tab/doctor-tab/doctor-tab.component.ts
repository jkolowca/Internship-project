import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/interfaces';
import { DoctorsService } from 'src/app/shared/services/doctors.service';

@Component({
	selector: 'app-doctor-tab',
	templateUrl: './doctor-tab.component.html',
	styleUrls: ['./doctor-tab.component.scss'],
})
export class DoctorTabComponent implements OnInit {
	doctor: Doctor;

	constructor(
		private route: ActivatedRoute,
		private doctorsService: DoctorsService
	) {}

	ngOnInit(): void {
		let doctorId = this.route.snapshot.paramMap.get('id');
		this.doctorsService.getById(doctorId).subscribe(doctor => {
			this.doctorsService.setCurrentDoctor(doctor);
			this.doctor = doctor;
		});
	}
}
