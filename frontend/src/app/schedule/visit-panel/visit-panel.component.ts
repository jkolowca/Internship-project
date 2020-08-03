import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-visit-panel',
	templateUrl: './visit-panel.component.html',
	styleUrls: ['./visit-panel.component.scss'],
})
export class VisitPanelComponent implements OnInit {
	@Input() visit: Visit;
	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {}

	idUser = this.route.snapshot.paramMap.get('idUser');

	addvisit() {}
}
