import { Component, ViewChild } from '@angular/core';
import { ClinicsListComponent } from './clinics-list/clinics-list.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';

@Component({
	selector: 'app-administrator',
	templateUrl: './administrator.component.html',
	styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent {
	@ViewChild(ClinicsListComponent) clinicsList: ClinicsListComponent;
	@ViewChild(DoctorsListComponent) doctorsList: DoctorsListComponent;
	display = 'doctors';

	onDoctorAdded() {
		this.doctorsList.ngOnInit();
	}
	onClinicAdded() {
		this.clinicsList.ngOnInit();
	}
}
