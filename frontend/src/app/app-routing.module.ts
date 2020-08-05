import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdmScheduleComponent } from './administrator/adm-schedule/adm-schedule.component';
import { DoctorEditComponent } from './administrator/doctor-edit/doctor-edit.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PacientComponent } from './pacient/pacient.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';
import { RegisteredVisitsListComponent } from './pacient/registered-visits-list/registered-visits-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';

const routes: Routes = [
	{ path: '', component: AuthenticationComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'admin', component: AdministratorComponent },
	{ path: 'admin/:id', component: DoctorEditComponent },
	{ path: 'admin/:id/schedule', component: AdmScheduleComponent },
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
