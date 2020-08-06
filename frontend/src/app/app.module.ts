import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';

import { DoctorTabComponent } from './administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { DoctorsTabComponent } from './administrator/doctors-tab/doctors-tab.component';
import { ClinicsTabComponent } from './administrator/clinics-tab/clinics-tab.component';
import { DoctorsListComponent } from './administrator/doctors-tab/doctors-list/doctors-list.component';
import { DoctorFormComponent } from './administrator/doctors-tab/doctor-form/doctor-form.component';
import { ClinicFormComponent } from './administrator/clinics-tab/clinic-form/clinic-form.component';
import { ClinicsListComponent } from './administrator/clinics-tab/clinics-list/clinics-list.component';
import { AdministratorTopPanelComponent } from './administrator/administrator-top-panel/administrator-top-panel.component';

import { DoctorComponent } from './doctor/doctor.component';

import { PacientComponent } from './pacient/pacient.component';
import { SearchBarComponent } from './pacient/search-bar/search-bar.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';
import { RegisteredVisitsListComponent } from './pacient/registered-visits-list/registered-visits-list.component';

import { ScheduleComponent } from './schedule/schedule.component';
import { VisitsListComponent } from './schedule/visits-list/visits-list.component';
import { PanelPacientComponent } from './schedule/panel-pacient/panel-pacient.component';
import { PanelAdminComponent } from './schedule/panel-admin/panel-admin.component';
import { PanelAddComponent } from './schedule/panel-add/panel-add.component';

import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
	declarations: [
		AppComponent,
		DoctorsListComponent,
		DoctorComponent,
		PacientComponent,
		SearchBarComponent,
		DoctorFormComponent,
		RegistrationFormComponent,
		ClinicFormComponent,
		DoctorTabComponent,
		ScheduleComponent,
		VisitsListComponent,
		RegisteredVisitsListComponent,
		RegisterComponent,
		LoginComponent,
		AuthenticationComponent,
		PanelPacientComponent,
		PanelAdminComponent,
		PanelAddComponent,
		ClinicsListComponent,
		DoctorsTabComponent,
		ClinicsTabComponent,
		AdministratorTopPanelComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
		CommonModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
