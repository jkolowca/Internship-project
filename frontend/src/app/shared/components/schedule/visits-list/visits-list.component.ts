import { Component, Input, OnInit } from '@angular/core';
import { VisitsService } from 'src/app/shared/services/visits.service';
import { Clinic, Visit } from '../../../../../../../common/interfaces';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss']
})
export class VisitsListComponent implements OnInit {
	@Input() clinics: Clinic[];
	@Input() query: any;

	visits: Visit[];
	visitsCount = 0;

	constructor(private visitService: VisitsService) {}

	ngOnInit(): void {
		this.query = { ...this.query, visitsPerPage: 10, page: 0 };
		this.loadVisits();
	}

	loadVisits(): void {
		this.visitService.findVisits(this.query).subscribe(res => {
			this.visits = res.visits;
			this.visitsCount = res.visitsCount;
		});
	}
}
