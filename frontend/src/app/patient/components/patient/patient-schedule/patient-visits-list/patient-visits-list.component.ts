import { Component, Input, OnInit } from '@angular/core';
import { Visit } from 'src/app/models/interfaces';
import { VisitsService } from 'src/app/shared/services/visits.service';

@Component({
	selector: 'app-patient-visits-list',
	templateUrl: './patient-visits-list.component.html',
	styleUrls: ['./patient-visits-list.component.scss'],
})
export class PatientVisitsListComponent implements OnInit {
	@Input() query: any;

	visits: Visit[];
	visitsCount = 0;

	constructor(private visitService: VisitsService) {}

	ngOnInit(): void {
		this.query = { ...this.query, visitsPerPage: 10, page: 0 };
		this.loadVisits();
	}

	loadVisits(query?: any): void {
		const newQuery = { ...this.query, ...query };
		this.visitService.findVisits(newQuery).subscribe(res => {
			this.visits = res.visits;
			this.visitsCount = res.visitsCount;
		});
	}
}
