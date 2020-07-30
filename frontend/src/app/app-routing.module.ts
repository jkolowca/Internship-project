import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdmScheduleEditComponent } from './administrator/adm-schedule-edit/adm-schedule-edit.component';
import { DoctorEditComponent } from './administrator/doctor-edit/doctor-edit.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PacientComponent } from './pacient/pacient.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';

const routes: Routes = [
	{ path: 'adm', component: AdministratorComponent },
	{ path: 'adm/:id', component: DoctorEditComponent },
	{ path: 'adm/:id/schedule', component: AdmScheduleEditComponent },
	{ path: 'doc', component: DoctorComponent },
	{ path: 'pac', component: PacientComponent },
	{ path: 'pac/registration/:id', component: RegistrationFormComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
