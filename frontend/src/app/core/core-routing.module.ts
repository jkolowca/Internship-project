import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: [] }
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [AuthenticationGuard],
		data: { accountTypes: [] }
	},
	{
		path: 'logout',
		component: LogoutComponent
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('../administrator/administrator.module').then(
				m => m.AdministratorModule
			),
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['admin'] }
	},
	{
		path: 'doctor',
		loadChildren: () =>
			import('../doctor/doctor.module').then(m => m.DoctorModule),
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['doctor'] }
	},
	{
		path: 'patient',
		loadChildren: () =>
			import('../patient/patient.module').then(m => m.PatientModule),
		canActivate: [AuthenticationGuard],
		data: { accountTypes: ['patient'] }
	},
	{
		path: '**',
		redirectTo: 'login'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule {}
