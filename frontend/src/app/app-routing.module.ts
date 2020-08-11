import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsTabComponent } from './administrator/doctors-tab/doctors-tab.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { RegistrationFormComponent } from './patient/registration-form/registration-form.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ClinicsTabComponent } from './administrator/clinics-tab/clinics-tab.component';
import { DoctorTabComponent } from './administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AdministratorComponent } from './administrator/administrator.component';
import { NewVisitsComponent } from './patient/new-visits/new-visits.component';
import { ScheduleComponent } from './schedule/schedule.component';
const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'admin',
		component: AdministratorComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['admin'] },
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'doctors',
			},
			{
				path: 'doctors',
				component: DoctorsTabComponent,
			},
			{
				path: 'clinics',
				component: ClinicsTabComponent,
			},
			{
				path: 'doctors/:id',
				component: DoctorTabComponent,
			},
		],
	},
	{
		path: 'doctor/:id',
		component: DoctorComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['doctor'] },
	},
	{
		path: 'patient/:id',
		component: PatientComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['patient'] },
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'search-visits',
			},
			{
				path: 'search-visits',
				component: NewVisitsComponent,
			},
			{
				path: 'registration/:id',
				component: RegistrationFormComponent,
			},
			{
				path: 'registered-visits',
				component: ScheduleComponent,
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
