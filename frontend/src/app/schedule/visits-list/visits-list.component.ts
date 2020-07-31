import { Component, OnInit } from '@angular/core';
import { VisitsService } from '../../services/visits.service';
import { Visit } from '../../interfaces';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss'],
})
export class VisitsListComponent implements OnInit {
	visits: Visit[];
	constructor(private visitService: VisitsService) {}

	ngOnInit(): void {}
}
