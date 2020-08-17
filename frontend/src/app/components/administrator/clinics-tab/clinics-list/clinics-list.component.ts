import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorPanelComponent } from 'src/app/components/shared/error-panel/error-panel.component';
import { ClinicsService } from 'src/app/services';
import { Clinic } from 'src/app/models/interfaces';

@Component({
	selector: 'app-clinics-list',
	templateUrl: './clinics-list.component.html',
	styleUrls: ['./clinics-list.component.scss'],
})
export class ClinicsListComponent implements OnInit {
	constructor(private clinicsService: ClinicsService) {}
	clinicsList: Clinic[];

	ngOnInit(): void {
		this.loadClinics();
	}

	loadClinics(): void {
		this.clinicsService
			.getAllClinics()
			.subscribe(list => (this.clinicsList = list));
	}

	removeClinic(id: string): void {
		this.clinicsService
			.deleteClinic(id)
			.subscribe(list => (this.clinicsList = list));
	}
}
