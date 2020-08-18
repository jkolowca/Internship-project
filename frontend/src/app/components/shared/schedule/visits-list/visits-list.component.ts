import { Component, Input, OnInit } from '@angular/core';
import { Clinic, Visit } from 'src/app/models/interfaces';
import { VisitsService } from 'src/app/services';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss'],
})
export class VisitsListComponent implements OnInit {
	@Input() clinics: Clinic[];
	@Input() doctor: string;
	@Input() type: string;

	visits: Visit[];
	query: any = {
		visitsPerPage: 10,
		page: 0,
	};
	visitsCount = 0;

	constructor(private visitService: VisitsService) {}

	ngOnInit(): void {
		this.query.doctor = this.doctor;
		this.query.type = this.type;
	}

	loadVisits(): void {
		this.visitService.findVisits(this.query).subscribe(res => {
			this.visits = res.visits;
			this.visitsCount = res.visitsCount;
		});
	}
}
