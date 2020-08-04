import { Component, OnInit, Input } from '@angular/core';
import { VisitsService } from '../../_services';
import { Visit, VisitCount } from '../../_models/interfaces';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss'],
})
export class VisitsListComponent implements OnInit {
	@Input() type: string;
	visits: Visit[];
	dailyVisitCount: VisitCount[];
	constructor(private visitService: VisitsService) {}

	ngOnInit(): void {
		this.visitService.getAll().subscribe(list => {
			this.visits = list;
		});
		this.visitService.getVisitDates().subscribe(list => {
			this.dailyVisitCount = list;
		});
	}

	getDailyVisits(day: number): Visit[] {
		let offset = this.dailyVisitCount
			.slice(0, day)
			.map(i => i.count)
			.reduce((a, b) => a + b, 0);
		return this.visits.slice(
			offset,
			offset + this.dailyVisitCount[day].count
		);
	}
}
