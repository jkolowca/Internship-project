import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/interfaces';
import { DoctorsService } from '../../services';

@Component({
	selector: 'app-adm-schedule-edit',
	templateUrl: './adm-schedule.component.html',
	styleUrls: ['./adm-schedule.component.scss'],
})
export class AdmScheduleComponent implements OnInit {
	doctor = <Doctor>{};
	constructor(
		private route: ActivatedRoute,
		private doctorsService: DoctorsService
	) {}

	ngOnInit(): void {
		const doctorId = this.route.snapshot.paramMap.get('id');
		this.doctorsService.getById(doctorId).subscribe(d => (this.doctor = d));
	}
}
