import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsTabComponent } from './administrator/doctors-tab/doctors-tab.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PacientComponent } from './pacient/pacient.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';
import { RegisteredVisitsListComponent } from './pacient/registered-visits-list/registered-visits-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ClinicsTabComponent } from './administrator/clinics-tab/clinics-tab.component';
import { DoctorTabComponent } from './administrator/doctors-tab/doctor-tab/doctor-tab.component';

const routes: Routes = [
	{ path: '', component: AuthenticationComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'admin', redirectTo: 'admin/doctors', pathMatch: 'full' },
	{ path: 'admin/doctors', component: DoctorsTabComponent },
	{ path: 'admin/clinics', component: ClinicsTabComponent },
	{ path: 'admin/doctors/:id', component: DoctorTabComponent },
	{ path: 'doctor', component: DoctorComponent },
	{ path: 'patient/:idUser', component: PacientComponent },
	{
		path: 'patient/:idUser/registration/:id',
		component: RegistrationFormComponent,
	},
	{
		path: 'patient/:idUser/registered-visits',
		component: RegisteredVisitsListComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
