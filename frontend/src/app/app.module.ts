import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { SearchBarComponent } from './components/patient/search-bar/search-bar.component';
import { RegistrationFormComponent } from './components/patient/registration-form/registration-form.component';
import { ScheduleComponent } from './components/shared/schedule/schedule.component';
import { VisitsListComponent } from './components/shared/schedule/visits-list/visits-list.component';
import { NewVisitsComponent } from './components/patient/new-visits/new-visits.component';
import { ErrorPanelComponent } from './components/shared/error-panel/error-panel.component';
import { MaterialModule } from './shared/material.module';
import { PatientScheduleComponent } from './components/patient/patient-schedule/patient-schedule.component';
import { PatientVisitsListComponent } from './components/patient/patient-schedule/patient-visits-list/patient-visits-list.component';
import { PatientVisitPanelComponent } from './components/patient/patient-schedule/patient-visits-list/patient-visit-panel/patient-visit-panel.component';
import { VisitDisplayPanelComponent } from './components/shared/schedule/visits-list/visit-display-panel/visit-display-panel.component';
import { VisitAddPanelComponent } from './components/shared/schedule/visits-list/visit-add-panel/visit-add-panel.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './services';
import { AuthenticationModule } from './authentication/authentication.module';
import { AdministratorModule } from './administrator/administrator.module';

export function init_app(authService: AuthService) {
	return () => authService.loadCurrentUser();
}

@NgModule({
	declarations: [
		AppComponent,
		DoctorComponent,
		PatientComponent,
		SearchBarComponent,
		RegistrationFormComponent,
		ScheduleComponent,
		VisitsListComponent,
		VisitDisplayPanelComponent,
		VisitAddPanelComponent,
		NewVisitsComponent,
		ErrorPanelComponent,
		PatientScheduleComponent,
		PatientVisitsListComponent,
		PatientVisitPanelComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
		CommonModule,
		AuthenticationModule,
		AdministratorModule,
	],
	providers: [
		AuthService,
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{
			provide: APP_INITIALIZER,
			useFactory: init_app,
			deps: [AuthService],
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
