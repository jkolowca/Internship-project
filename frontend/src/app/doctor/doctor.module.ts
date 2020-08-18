import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [DoctorComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		SharedModule,
		DoctorRoutingModule,
	],
})
export class DoctorModule {}
