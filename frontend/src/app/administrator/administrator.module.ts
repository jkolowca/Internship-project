import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsListComponent } from './components/administrator/doctors-tab/doctors-list/doctors-list.component';
import { DoctorFormComponent } from './components/administrator/doctors-tab/doctor-form/doctor-form.component';
import { ClinicFormComponent } from './components/administrator/clinics-tab/clinic-form/clinic-form.component';
import { DoctorTabComponent } from './components/administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { ClinicsListComponent } from './components/administrator/clinics-tab/clinics-list/clinics-list.component';
import { DoctorsTabComponent } from './components/administrator/doctors-tab/doctors-tab.component';
import { ClinicsTabComponent } from './components/administrator/clinics-tab/clinics-tab.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { EditTabComponent } from './components/administrator/doctors-tab/doctor-tab/edit-tab/edit-tab.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		DoctorsListComponent,
		DoctorFormComponent,
		ClinicFormComponent,
		DoctorTabComponent,
		ClinicsListComponent,
		DoctorsTabComponent,
		ClinicsTabComponent,
		AdministratorComponent,
		EditTabComponent,
	],
	imports: [
		CommonModule,
		AdministratorRoutingModule,
		MaterialModule,
		HttpClientModule,
	],
})
export class AdministratorModule {}
