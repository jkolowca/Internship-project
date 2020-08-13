import { Component, Input } from '@angular/core';
import { Clinic, Visit, VisitCount } from 'src/app/models/interfaces';
import { VisitsService } from 'src/app/services';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss'],
})
export class VisitsListComponent {
	@Input() type: string;
	@Input() clinics: Clinic[];
	visits: Visit[];
	registeredVisits: Visit[];
	dailyVisitCount: VisitCount[];
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
			this.dailyVisitCount = res.dates;
			this.visitsCount = res.visitsCount;
		});
	}

	getVisitsForGivenDay(day: number, visits: Visit[]): Visit[] {
		let offset = this.dailyVisitCount
			.slice(0, day)
			.map(i => i.count)
			.reduce((a, b) => a + b, 0);
		return visits.slice(offset, offset + this.dailyVisitCount[day].count);
	}
}
