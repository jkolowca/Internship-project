import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { DoctorsTabComponent } from './components/administrator/doctors-tab/doctors-tab.component';
import { ClinicsTabComponent } from './components/administrator/clinics-tab/clinics-tab.component';
import { DoctorTabComponent } from './components/administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { NewVisitsComponent } from './components/patient/new-visits/new-visits.component';
import { RegistrationFormComponent } from './components/patient/registration-form/registration-form.component';
import { ScheduleComponent } from './components/shared/schedule/schedule.component';
import { EditTabComponent } from './components/administrator/doctors-tab/doctor-tab/edit-tab/edit-tab.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';

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
		path: 'logout',
		component: LogoutComponent,
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
				children: [
					{
						path: '',
						pathMatch: 'full',
						redirectTo: 'edit',
					},
					{
						path: 'edit',
						component: EditTabComponent,
					},
					//{
					//	path: 'schedule',
					//},
				],
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
