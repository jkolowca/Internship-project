import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './components/doctor/doctor.component';

const routes: Routes = [
	{
		path: ':id',
		component: DoctorComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DoctorRoutingModule {}
