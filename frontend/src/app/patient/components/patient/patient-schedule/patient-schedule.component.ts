import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-patient-schedule',
	templateUrl: './patient-schedule.component.html',
	styleUrls: ['./patient-schedule.component.scss']
})
export class PatientScheduleComponent {
	patientId = this.route.parent.snapshot.paramMap.get('id');

	constructor(private route: ActivatedRoute) {}
}
