import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../_models/interfaces';
import { DoctorsService } from '../_services/doctors.service';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
	doctor: Doctor;

	constructor(
		private route: ActivatedRoute,
		private doctorsService: DoctorsService
	) {}

	ngOnInit(): void {
		const doctorId = this.route.snapshot.paramMap.get('id');
		this.doctorsService.getDoctorById(doctorId);
	}
}
