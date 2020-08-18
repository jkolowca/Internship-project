import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdministratorModule } from '../administrator/administrator.module';
import { DoctorModule } from '../doctor/doctor.module';
import { SharedModule } from '../shared/shared.module';
import { PatientModule } from '../patient/patient.module';
import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { ErrorPanelComponent } from './components/error-panel/error-panel.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import {
	ErrorService,
	AuthService,
	ClinicsService,
	DoctorsService,
	VisitsService,
} from './services';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

export function init_app(authService: AuthService) {
	return () => authService.loadCurrentUser();
}

@NgModule({
	declarations: [
		ErrorPanelComponent,
		LoginComponent,
		RegisterComponent,
		LogoutComponent,
	],
	imports: [
		CoreRoutingModule,
		HttpClientModule,
		CommonModule,
		AdministratorModule,
		DoctorModule,
		SharedModule,
		PatientModule,
	],
	providers: [
		ErrorService,
		AuthService,
		ClinicsService,
		DoctorsService,
		VisitsService,
		AuthenticationGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{
			provide: APP_INITIALIZER,
			useFactory: init_app,
			deps: [AuthService],
			multi: true,
		},
	],
	exports: [RouterModule, ErrorPanelComponent],
})
export class CoreModule {}
