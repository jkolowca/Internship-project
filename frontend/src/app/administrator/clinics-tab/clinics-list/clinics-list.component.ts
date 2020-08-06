import { Component, OnInit } from '@angular/core';
import { ClinicsService } from '../../../services';
import { Clinic } from '../../../models/interfaces';

@Component({
	selector: 'app-clinics-list',
	templateUrl: './clinics-list.component.html',
	styleUrls: ['./clinics-list.component.scss'],
})
export class ClinicsListComponent implements OnInit {
	constructor(private clinicsService: ClinicsService) {}
	clinicsList: Clinic[];

	ngOnInit(): void {
		this.clinicsService
			.getAllClinics()
			.subscribe(list => (this.clinicsList = list.sort(compare)));
	}

	removeClinic(id: string): void {
		this.clinicsService
			.deleteClinic(id)
			.subscribe(list => (this.clinicsList = list));
	}
}

function compare(a: Clinic, b: Clinic): number {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}
