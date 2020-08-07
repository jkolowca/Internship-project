import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services';
import { User } from '../models/interfaces';
import { VisitsListComponent } from '../schedule/visits-list/visits-list.component';

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
	@ViewChild(VisitsListComponent) visitList: VisitsListComponent;
	patient: User;
	appointment: any;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
    this.authService.getCurrentUserProfile().subscribe(patient => this.patient = patient);
	}
	logout() {
		this.authService.doLogout();
	}
	loadVisits(query: Object) {
		this.visitList.loadVisits({query, appointment: 'available', type: 'active'});
	}
}
