import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { NewVisitsComponent } from './components/patient/new-visits/new-visits.component';
import { RegistrationFormComponent } from './components/patient/registration-form/registration-form.component';
import { PatientScheduleComponent } from './components/patient/patient-schedule/patient-schedule.component';

const routes: Routes = [
	{
		path: '',
		loadChildren:
			'./authentication/authentication.module#AuthenticationModule',
	},
	{
		path: 'admin',
		loadChildren:
			'./administrator/administrator.module#AdministratorModule',
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['admin'] },
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
				component: PatientScheduleComponent,
			},
		],
	},
	{
		path: '**',
		redirectTo: 'login',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
