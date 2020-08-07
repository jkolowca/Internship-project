import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services';
import { User } from '../models/interfaces';
import { VisitsListComponent } from '../schedule/visits-list/visits-list.component';

@Component({
	selector: 'app-pacient',
	templateUrl: './pacient.component.html',
	styleUrls: ['./pacient.component.scss'],
})
export class PacientComponent implements OnInit {
	@ViewChild(VisitsListComponent) visitList: VisitsListComponent;
	patient: User;
	appointment: any;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.patient = this.authService.currentUser;
	}
	logout() {
		this.authService.doLogout();
	}
	loadVisits(query: Object) {
		this.visitList.loadVisits({query, appointment: 'available', type: 'active'});
	}
}
