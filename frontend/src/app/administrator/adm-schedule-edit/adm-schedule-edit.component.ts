import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/interfaces';
import { DoctorsService } from '../../services/doctors.service';

@Component({
	selector: 'app-adm-schedule-edit',
	templateUrl: './adm-schedule-edit.component.html',
	styleUrls: ['./adm-schedule-edit.component.scss'],
})
export class AdmScheduleEditComponent implements OnInit {
	doctor = {};
	constructor(
		private route: ActivatedRoute,
		private doctorsService: DoctorsService
	) {}

	ngOnInit(): void {
		const doctorId = this.route.snapshot.paramMap.get('id');
		this.doctorsService
			.getDoctorById(doctorId)
			.subscribe(d => (this.doctor = d));
	}
}
