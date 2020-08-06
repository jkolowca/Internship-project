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
	visits: Visit[];
	registeredVisits: Visit[];
	dailyVisitCount: VisitCount[];
	patientId: string;
	constructor(private visitService: VisitsService,
		private route: ActivatedRoute) {
			 this.patientId = this.route.snapshot.queryParamMap.get("idUser");
		}

	ngOnInit(): void {
		this.visitService.getAll().subscribe(list => {
			this.visits = list;
		});
		this.visitService.getVisitDates().subscribe(list => {
			this.dailyVisitCount = list;
		});
		
		this.patientId = this.route.snapshot.paramMap.get('idUser');

		this.visitService.getRegisteredVisits(this.patientId).subscribe(list => {
			this.registeredVisits = list;
			
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

	getDailyRegVisits(day: number): Visit[] {
		let offset = this.dailyVisitCount
			.slice(0, day)
			.map(i => i.count)
			.reduce((a, b) => a + b, 0);
		return this.registeredVisits.slice(
			offset,
			offset + this.dailyVisitCount[day].count
		);
	}
}
