import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PatientComponent } from './components/patient/patient.component';
import { NewVisitsComponent } from './components/patient/new-visits/new-visits.component';
import { RegistrationFormComponent } from './components/patient/registration-form/registration-form.component';
import { PatientScheduleComponent } from './components/patient/patient-schedule/patient-schedule.component';

const routes: Routes = [
	{
		path: ':id',
		component: PatientComponent,
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
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PatientRoutingModule {}
