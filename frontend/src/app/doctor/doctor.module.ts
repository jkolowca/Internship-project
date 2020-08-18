import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { DoctorRoutingModule } from './doctor-routing.module';

@NgModule({
	declarations: [DoctorComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		DoctorRoutingModule,
	],
})
export class DoctorModule {}
