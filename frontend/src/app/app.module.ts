import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './services';
import { AuthenticationModule } from './authentication/authentication.module';
import { AdministratorModule } from './administrator/administrator.module';
import { DoctorModule } from './doctor/doctor.module';
import { MaterialModule} from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { PatientModule } from './patient/patient.module';

export function init_app(authService: AuthService) {
	return () => authService.loadCurrentUser();
}

@NgModule({
	declarations: [
		AppComponent,

	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
		CommonModule,
		AuthenticationModule,
		AdministratorModule,
		DoctorModule,
		SharedModule,
		PatientModule
	],
	providers: [
		AuthService,
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{
			provide: APP_INITIALIZER,
			useFactory: init_app,
			deps: [AuthService],
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
