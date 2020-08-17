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
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	constructor(private clinicsService: ClinicsService) {}
	clinicsList: Clinic[];

	ngOnInit(): void {
		this.loadClinics();
	}

	loadClinics(): void {
		this.clinicsService.getAllClinics().subscribe(
			list => (this.clinicsList = list.sort(compare)),
			e => this.errorPanel.displayError(e)
		);
	}

	removeClinic(id: string): void {
		this.clinicsService.deleteClinic(id).subscribe(
			list => (this.clinicsList = list),
			e => this.errorPanel.displayError(e)
		);
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
