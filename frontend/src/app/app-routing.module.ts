import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdmScheduleEditComponent } from './administrator/adm-schedule-edit/adm-schedule-edit.component';
import { DoctorEditComponent } from './administrator/doctor-edit/doctor-edit.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PacientComponent } from './pacient/pacient.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';
import { RegisteredVisitsListComponent } from './pacient/registered-visits-list/registered-visits-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';

const routes: Routes = [
	{ path: '', component: AuthenticationComponent},
	{ path: 'register', component: RegisterComponent},
	{ path: 'adm', component: AdministratorComponent },
	{ path: 'adm/:id', component: DoctorEditComponent },
	{ path: 'adm/:id/schedule', component: AdmScheduleEditComponent },
	{ path: 'doc', component: DoctorComponent },
	{ path: 'pac/:idUser', component: PacientComponent },
	{ path: 'pac/:idUser/registration/:id', component: RegistrationFormComponent },
	{ path: 'pac/:idUser/registeredVisits', component: RegisteredVisitsListComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
