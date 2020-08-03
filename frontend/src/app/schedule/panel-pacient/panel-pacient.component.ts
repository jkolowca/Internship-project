import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/interfaces';

@Component({
	selector: 'app-panel-pacient',
	templateUrl: './panel-pacient.component.html',
	styleUrls: ['./panel-pacient.component.scss'],
})
export class PanelPacientComponent implements OnInit {
	@Input() visit: Visit;
	constructor() {}

	ngOnInit(): void {}

	addvisit() {}
}
