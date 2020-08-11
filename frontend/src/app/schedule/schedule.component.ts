import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { VisitsListComponent } from './visits-list/visits-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements AfterViewInit {
	@ViewChild('active') activeVisits: VisitsListComponent;
	@ViewChild('archived') archivedVisits: VisitsListComponent;
	@Input() doctorId: string;

	constructor(private route: ActivatedRoute) {}

	ngAfterViewInit() {
		if (this.doctorId) {
			this.activeVisits.loadVisits({
				type: 'active',
				doctor: this.doctorId,
			});
			this.archivedVisits.loadVisits({
				type: 'archived',
				doctor: this.doctorId,
			});
		} else {
			let patientId = this.route.parent.snapshot.paramMap.get('idUser');
			console.log(patientId);
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
}
