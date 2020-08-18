import {
	Component,
	AfterViewInit,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { PatientVisitsListComponent } from './patient-visits-list/patient-visits-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-patient-schedule',
	templateUrl: './patient-schedule.component.html',
	styleUrls: ['./patient-schedule.component.scss'],
})
export class PatientScheduleComponent implements AfterViewInit {
	@ViewChildren(PatientVisitsListComponent) visitsList: QueryList<
		PatientVisitsListComponent
	>;
	patientId = this.route.parent.snapshot.paramMap.get('id');

	constructor(private route: ActivatedRoute) {}

	ngAfterViewInit() {
		this.visitsList.forEach(list => list.loadVisits());
	}
}
