import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { MainComponent as doc } from './doctor/main/main.component';
import { MainComponent as pac } from './pacient/main/main.component';
import { RegistrationFormComponent } from './pacient/registration-form/registration-form.component';

const routes: Routes = [
	{ path: 'adm', component: AdministratorComponent },
	{ path: 'doc', component: doc },
	{ path: 'pac', component: pac },
	{ path: 'pac/registration', component: RegistrationFormComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
