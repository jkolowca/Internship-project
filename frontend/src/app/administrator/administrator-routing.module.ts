import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { DoctorsTabComponent } from './components/administrator/doctors-tab/doctors-tab.component';
import { ClinicsTabComponent } from './components/administrator/clinics-tab/clinics-tab.component';
import { DoctorTabComponent } from './components/administrator/doctors-tab/doctor-tab/doctor-tab.component';
import { EditTabComponent } from './components/administrator/doctors-tab/doctor-tab/edit-tab/edit-tab.component';
import { ScheduleComponent } from '../shared/components/shared/schedule/schedule.component';

const routes: Routes = [
	{
		path: '',
		component: AdministratorComponent,
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
					{
						path: 'schedule',
						component: ScheduleComponent,
					},
				],
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdministratorRoutingModule {}
