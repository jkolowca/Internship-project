import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsTabComponent } from './administrator/doctors-tab/doctors-tab.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { RegistrationFormComponent } from './patient/registration-form/registration-form.component';
import { RegisteredVisitsListComponent } from './patient/registered-visits-list/registered-visits-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ClinicsTabComponent } from './administrator/clinics-tab/clinics-tab.component';
import { DoctorTabComponent } from './administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { AuthenticationGuard } from './guard/authentication.guard';
const routes: Routes = [
	{
		path: '',
		component: AuthenticationComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'admin',
		redirectTo: 'admin/doctors',
		pathMatch: 'full',
	},
	{
		path: 'admin/doctors',
		component: DoctorsTabComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['admin'] },
	},
	{
		path: 'admin/clinics',
		component: ClinicsTabComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['admin'] },
	},
	{
		path: 'admin/doctors/:id',
		component: DoctorTabComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['admin'] },
	},
	{
		path: 'doctor',
		component: DoctorComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['doctor'] },
	},
	{
		path: 'patient/:idUser',
		component: PatientComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['patient'] },
	},
	{
		path: 'patient/:idUser/registration/:id',
		component: RegistrationFormComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['patient'] },
	},
	{
		path: 'patient/:idUser/registered-visits',
		component: RegisteredVisitsListComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['patient'] },
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
