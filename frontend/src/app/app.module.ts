import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';

import { DoctorTabComponent } from './administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { DoctorsTabComponent } from './administrator/doctors-tab/doctors-tab.component';
import { ClinicsTabComponent } from './administrator/clinics-tab/clinics-tab.component';
import { DoctorsListComponent } from './administrator/doctors-tab/doctors-list/doctors-list.component';
import { DoctorFormComponent } from './administrator/doctors-tab/doctor-form/doctor-form.component';
import { ClinicFormComponent } from './administrator/clinics-tab/clinic-form/clinic-form.component';
import { ClinicsListComponent } from './administrator/clinics-tab/clinics-list/clinics-list.component';

import { DoctorComponent } from './doctor/doctor.component';

import { PatientComponent } from './patient/patient.component';
import { SearchBarComponent } from './patient/search-bar/search-bar.component';
import { RegistrationFormComponent } from './patient/registration-form/registration-form.component';

import { ScheduleComponent } from './schedule/schedule.component';
import { VisitsListComponent } from './schedule/visits-list/visits-list.component';
import { PanelPatientComponent } from './schedule/panel-patient/panel-patient.component';
import { PanelAdminComponent } from './schedule/panel-admin/panel-admin.component';
import { PanelAddComponent } from './schedule/panel-add/panel-add.component';

import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { NewVisitsComponent } from './patient/new-visits/new-visits.component';
import { ErrorPanelComponent } from './error-panel/error-panel.component';

@NgModule({
	declarations: [
		AppComponent,
		DoctorsListComponent,
		DoctorComponent,
		PatientComponent,
		SearchBarComponent,
		DoctorFormComponent,
		RegistrationFormComponent,
		ClinicFormComponent,
		DoctorTabComponent,
		ScheduleComponent,
		VisitsListComponent,
		RegisterComponent,
		LoginComponent,
		PanelPatientComponent,
		PanelAdminComponent,
		PanelAddComponent,
		ClinicsListComponent,
		DoctorsTabComponent,
		ClinicsTabComponent,
		AdministratorComponent,
		NewVisitsComponent,
		ErrorPanelComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
		CommonModule,
	],
	providers: [DatePipe],
	bootstrap: [AppComponent],
})
export class AppModule {}
