import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicsListComponent } from './clinics-list/clinics-list.component';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
	selector: 'app-clinics-tab',
	templateUrl: './clinics-tab.component.html',
	styleUrls: ['./clinics-tab.component.scss'],
})
export class ClinicsTabComponent {
	@ViewChild(ClinicsListComponent) clinicsList: ClinicsListComponent;
	@ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
	showForm = true;

	onClinicAdded() {
		this.clinicsList.ngOnInit();
		this.resetForm();
	}

	resetForm() {
		this.panel.close();
		this.showForm = false;
		setTimeout(_ => {
			this.showForm = true;
		}, 100);
	}
}