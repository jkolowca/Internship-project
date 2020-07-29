import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsListComponent } from './administrator/doctors-list/doctors-list.component';
import { MainComponent as AdministratorComponent } from './administrator/main/main.component';
import { MainComponent as DoctorComponent } from './doctor/main/main.component';
import { MainComponent as PacientComponent } from './pacient/main/main.component';
import { SearchBarComponent } from './pacient/search-bar/search-bar.component';
import { VisitListComponent } from './pacient/visit-list/visit-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';

@NgModule({
	declarations: [
		AppComponent,
		DoctorsListComponent,
		AdministratorComponent,
		DoctorComponent,
		PacientComponent,
		SearchBarComponent,
		VisitListComponent,
		RegistrationFormComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatExpansionModule,
		HttpClientModule,
		MatCardModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
