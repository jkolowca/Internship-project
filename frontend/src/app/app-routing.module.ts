import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdmScheduleComponent } from './administrator/adm-schedule/adm-schedule.component';
import { DoctorEditComponent } from './administrator/doctor-edit/doctor-edit.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PacientComponent } from './pacient/pacient.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';
import { RegisteredVisitsListComponent } from './pacient/registered-visits-list/registered-visits-list.component';

const routes: Routes = [
	{ path: 'adm', component: AdministratorComponent },
	{ path: 'adm/:id', component: DoctorEditComponent },
	{ path: 'adm/:id/schedule', component: AdmScheduleComponent },
	{ path: 'doc', component: DoctorComponent },
	{ path: 'pac', component: PacientComponent },
	{ path: 'pac/registration/:id', component: RegistrationFormComponent },
	{ path: 'pac/registeredVisits', component: RegisteredVisitsListComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
