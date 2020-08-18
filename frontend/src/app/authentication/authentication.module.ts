import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent, LogoutComponent],
	exports: [LoginComponent, RegisterComponent, LogoutComponent],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		MaterialModule,
		HttpClientModule,
	],
})
export class AuthenticationModule {}
