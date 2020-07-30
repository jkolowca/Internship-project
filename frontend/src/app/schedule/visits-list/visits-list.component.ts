import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/interfaces/visit';

@Component({
	selector: 'app-visits-list',
	templateUrl: './visits-list.component.html',
	styleUrls: ['./visits-list.component.scss'],
})
export class VisitsListComponent implements OnInit {
	@Input() type: string;
	now = new Date();
	visits: Visit[];

	constructor() {}

	ngOnInit(): void {}
}
