import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { AppComponent } from './app.component';
import { MainComponent as AdministratorComponent } from './administrator/main/main.component';
import { DoctorsListComponent } from './administrator/doctors-list/doctors-list.component';
import { MainComponent as DoctorComponent } from './doctor/main/main.component';
import { MainComponent as PacientComponent } from './pacient/main/main.component';
import { SearchBarComponent } from './pacient/search-bar/search-bar.component';
import { VisitListComponent } from './pacient/visit-list/visit-list.component';
import { DoctorFormComponent } from './administrator/doctor-form/doctor-form.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';

@NgModule({
	declarations: [
		AppComponent,
		AdministratorComponent,
		DoctorsListComponent,
		DoctorComponent,
		PacientComponent,
		SearchBarComponent,
		VisitListComponent,
		DoctorFormComponent,
		RegistrationFormComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
