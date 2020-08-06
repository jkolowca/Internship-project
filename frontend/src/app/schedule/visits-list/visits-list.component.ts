import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitsService } from '../../services';
import { Visit, VisitCount } from '../../models/interfaces';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss'],
})
export class VisitsListComponent implements OnInit {
	@Input() type: string;
	@Input() doctorId: string;

	visits: Visit[];
	registeredVisits: Visit[];
	dailyVisitCount: VisitCount[];
	patientId: string;
	visitsFiltered: Visit[];
	constructor(
		private visitService: VisitsService,
		private route: ActivatedRoute
	) {
		this.patientId = this.route.snapshot.queryParamMap.get('idUser');
	}

	ngOnInit(): void {
		let query: { [k: string]: any } = {};
		query.type = this.type;
		if (this.doctorId) query.doctor = this.doctorId;

		this.visitService.findVisits(query).subscribe(list => {
			this.visits = list;
		});
		this.visitService.getVisitDates(query).subscribe(list => {
			this.dailyVisitCount = list;
		});

		this.patientId = this.route.snapshot.paramMap.get('idUser');

		this.visitService
			.getRegisteredVisits(this.patientId)
			.subscribe(list => {
				this.registeredVisits = list;
			});
	}

	getDailyVisits(day: number, visits: Visit[]): Visit[] {
		let offset = this.dailyVisitCount
			.slice(0, day)
			.map(i => i.count)
			.reduce((a, b) => a + b, 0);
		return visits.slice(offset, offset + this.dailyVisitCount[day].count);
	}

	getFiltered() {
		this.visitService
			.getFiltered()
			.subscribe(l => (this.visitsFiltered = l));
		console.log(this.visitsFiltered);
	}
}
