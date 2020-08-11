import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Doctor } from 'src/app/models/interfaces';

@Component({
	selector: 'app-doctors-tab',
	templateUrl: './doctors-tab.component.html',
})
export class DoctorsTabComponent {
	@ViewChild(DoctorsListComponent) doctorsList: DoctorsListComponent;
	@ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
	editedDoctor: Doctor;
	showForm = true;
	onDoctorAdded() {
		this.doctorsList.ngOnInit();
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
