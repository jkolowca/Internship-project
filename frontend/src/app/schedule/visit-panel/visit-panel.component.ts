import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/interfaces';

@Component({
	selector: 'app-visit-panel',
	templateUrl: './visit-panel.component.html',
	styleUrls: ['./visit-panel.component.scss'],
})
export class VisitPanelComponent implements OnInit {
	@Input() visit: Visit;
	constructor() {}

	ngOnInit(): void {}

	addvisit() {}
}
