import { Component, OnInit } from '@angular/core';
import { VisitsService } from '../../services/visits.service';
import { Visit } from '../../interfaces/visit';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss'],
})
export class VisitsListComponent implements OnInit {
	constructor(private visitService: VisitsService) {}
	visitsList: Visit[];

	ngOnInit(): void {
		this.visitService.getAll().subscribe(list => (this.visitsList = list));
	}
}
