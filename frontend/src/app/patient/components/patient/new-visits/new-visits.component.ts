import { Component, ViewChild } from '@angular/core';
import { PatientVisitsListComponent } from '../patient-schedule/patient-visits-list/patient-visits-list.component';

@Component({
	selector: 'app-new-visits',
	templateUrl: './new-visits.component.html',
	styleUrls: ['./new-visits.component.scss'],
})
export class NewVisitsComponent {
	@ViewChild(PatientVisitsListComponent)
	visitList: PatientVisitsListComponent;

	loadVisits(query: any) {
		this.visitList.loadVisits(query);
	}
}
