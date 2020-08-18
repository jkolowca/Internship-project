import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren:
			'../authentication/authentication.module#AuthenticationModule',
	},
	{
		path: 'admin',
		loadChildren:
			'../administrator/administrator.module#AdministratorModule',
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['admin'] },
	},
	{
		path: 'doctor',
		loadChildren: '../doctor/doctor.module#DoctorModule',
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['doctor'] },
	},
	{
		path: 'patient',
		loadChildren: '../patient/patient.module#PatientModule',
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['patient'] },
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
export class CoreRoutingModule {}
