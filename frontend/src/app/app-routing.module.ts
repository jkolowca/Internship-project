import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { MainComponent as doc } from './doctor/main/main.component';
import { MainComponent as pac } from './pacient/main/main.component';

const routes: Routes = [
	{ path: 'adm', component: AdministratorComponent },
	{ path: 'doc', component: doc },
	{ path: 'pac', component: pac },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
