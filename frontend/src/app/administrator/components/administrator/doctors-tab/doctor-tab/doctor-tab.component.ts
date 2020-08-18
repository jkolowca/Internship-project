import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from 'src/app/services';
import { Doctor } from 'src/app/models/interfaces';

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
