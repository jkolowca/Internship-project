import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PatientVisitsListComponent } from './patient-visits-list/patient-visits-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-patient-schedule',
	templateUrl: './patient-schedule.component.html',
	styleUrls: ['./patient-schedule.component.scss'],
})
export class PatientScheduleComponent implements AfterViewInit {
	@ViewChild('active') activeVisits: PatientVisitsListComponent;
	@ViewChild('archived') archivedVisits: PatientVisitsListComponent;
	constructor(private route: ActivatedRoute) {}

	ngAfterViewInit() {
		let patientId = this.route.parent.snapshot.paramMap.get('id');
		this.activeVisits.loadVisits({
			type: 'active',
			patient: patientId,
		});
		this.archivedVisits.loadVisits({
			type: 'archived',
			patient: patientId,
		});
	}
}
