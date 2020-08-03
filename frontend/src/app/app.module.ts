import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { AppComponent } from './app.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { DoctorsListComponent } from './administrator/doctors-list/doctors-list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PacientComponent } from './pacient/pacient.component';
import { SearchBarComponent } from './pacient/search-bar/search-bar.component';
import { DoctorFormComponent } from './administrator/doctor-form/doctor-form.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';
import { ClinicFormComponent } from './administrator/clinic-form/clinic-form.component';
import { DoctorEditComponent } from './administrator/doctor-edit/doctor-edit.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdmScheduleComponent } from './administrator/adm-schedule/adm-schedule.component';
import { VisitsListComponent } from './schedule/visits-list/visits-list.component';
import { RegisteredVisitsListComponent } from './pacient/registered-visits-list/registered-visits-list.component';
import { PanelPacientComponent } from './schedule/panel-pacient/panel-pacient.component';
import { PanelAdminComponent } from './schedule/panel-admin/panel-admin.component';

@NgModule({
	declarations: [
		AppComponent,
		AdministratorComponent,
		DoctorsListComponent,
		DoctorComponent,
		PacientComponent,
		SearchBarComponent,
		DoctorFormComponent,
		RegistrationFormComponent,
		ClinicFormComponent,
		DoctorEditComponent,
		ScheduleComponent,
		AdmScheduleComponent,
		VisitsListComponent,
		RegisteredVisitsListComponent,
		PanelPacientComponent,
		PanelAdminComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
