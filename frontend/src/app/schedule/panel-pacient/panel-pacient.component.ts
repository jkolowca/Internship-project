import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/_models/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-panel-pacient',
	templateUrl: './panel-pacient.component.html',
	styleUrls: ['./panel-pacient.component.scss'],
})
export class PanelPacientComponent implements OnInit {
	@Input() visit: Visit;
	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {}

	idUser = this.route.snapshot.paramMap.get('idUser');

	addvisit() {}
}
