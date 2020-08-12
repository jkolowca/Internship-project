import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicsService } from '../../../services';
import { Clinic } from '../../../models/interfaces';
import { ErrorPanelComponent } from 'src/app/error-panel/error-panel.component';

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
