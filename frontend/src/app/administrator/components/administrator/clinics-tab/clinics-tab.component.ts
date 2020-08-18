import { Component, ViewChild } from '@angular/core';
import { ClinicsListComponent } from './clinics-list/clinics-list.component';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
	selector: 'app-clinics-tab',
	templateUrl: './clinics-tab.component.html',
})
export class ClinicsTabComponent {
	@ViewChild(ClinicsListComponent) clinicsList: ClinicsListComponent;
	@ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
	showForm = true;

	onClinicAdded() {
		this.clinicsList.loadClinics();
		this.resetForm();
	}

	resetForm() {
		this.panel.close();
		this.showForm = false;
		setTimeout(() => {
			this.showForm = true;
		}, 100);
	}
}
