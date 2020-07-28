import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent as adm } from './administrator/main/main.component';
import { MainComponent as doc } from './doctor/main/main.component';
import { MainComponent as pac } from './pacient/main/main.component';

const routes: Routes = [
	{ path: 'adm', component: adm },
	{ path: 'doc', component: doc },
	{ path: 'pac', component: pac },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
