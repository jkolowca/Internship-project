import { Component } from '@angular/core';
import { Visit, VisitCount } from 'src/app/models/interfaces';
import { VisitsService } from 'src/app/services';

@Component({
	selector: 'app-patient-visits-list',
	templateUrl: './patient-visits-list.component.html',
	styleUrls: ['./patient-visits-list.component.scss'],
})
export class PatientVisitsListComponent {
	visits: Visit[];
	registeredVisits: Visit[];
	query: any = {
		visitsPerPage: 10,
		page: 0,
	};
	visitsCount = 0;

	constructor(private visitService: VisitsService) {}

	loadVisits(query?: any): void {
		if (query) {
			this.query = query;
			this.query.page = 0;
			this.query.visitsPerPage = 10;
		}
		this.visitService.findVisits(this.query).subscribe(res => {
			this.visits = res.visits;
			this.visitsCount = res.visitsCount;
		});
	}
}
