import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services';
import { User } from '../models/interfaces';

@Component({
	selector: 'app-pacient',
	templateUrl: './pacient.component.html',
	styleUrls: ['./pacient.component.scss'],
})
export class PacientComponent implements OnInit {
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

	logout() {
		this.authService.doLogout();
	}
}
