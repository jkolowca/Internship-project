import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services';

@Component({
	selector: 'app-registered-visits-list',
	templateUrl: './registered-visits-list.component.html',
	styleUrls: ['./registered-visits-list.component.scss'],
})
export class RegisteredVisitsListComponent implements OnInit {
	pacient = <User>{};
	constructor(
		private route: ActivatedRoute,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		const pacientId = this.route.snapshot.paramMap.get('idUser');
		this.authService
			.getUserProfile(pacientId)
			.subscribe(d => (this.pacient = d));
	}
}
