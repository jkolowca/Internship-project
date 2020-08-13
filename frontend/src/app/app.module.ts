import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { DoctorsListComponent } from './components/administrator/doctors-tab/doctors-list/doctors-list.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { SearchBarComponent } from './components/patient/search-bar/search-bar.component';
import { DoctorFormComponent } from './components/administrator/doctors-tab/doctor-form/doctor-form.component';
import { RegistrationFormComponent } from './components/patient/registration-form/registration-form.component';
import { ClinicFormComponent } from './components/administrator/clinics-tab/clinic-form/clinic-form.component';
import { DoctorTabComponent } from './components/administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { ScheduleComponent } from './components/shared/schedule/schedule.component';
import { VisitsListComponent } from './components/shared/schedule/visits-list/visits-list.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { PanelPatientComponent } from './components/shared/schedule/panel-patient/panel-patient.component';
import { PanelAdminComponent } from './components/shared/schedule/panel-admin/panel-admin.component';
import { PanelAddComponent } from './components/shared/schedule/panel-add/panel-add.component';
import { ClinicsListComponent } from './components/administrator/clinics-tab/clinics-list/clinics-list.component';
import { DoctorsTabComponent } from './components/administrator/doctors-tab/doctors-tab.component';
import { ClinicsTabComponent } from './components/administrator/clinics-tab/clinics-tab.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { NewVisitsComponent } from './components/patient/new-visits/new-visits.component';
import { ErrorPanelComponent } from './components/shared/error-panel/error-panel.component';
import { MaterialModule } from './shared/material.module';
import { EditTabComponent } from './components/administrator/doctors-tab/doctor-tab/edit-tab/edit-tab.component';

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
		EditTabComponent,
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
