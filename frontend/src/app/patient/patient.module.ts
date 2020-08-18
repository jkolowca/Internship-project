import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './components/patient/patient.component';
import { NewVisitsComponent } from './components/patient/new-visits/new-visits.component';
import { PatientScheduleComponent } from './components/patient/patient-schedule/patient-schedule.component';
import { PatientVisitsListComponent } from './components/patient/patient-schedule/patient-visits-list/patient-visits-list.component';
import { PatientVisitPanelComponent } from './components/patient/patient-schedule/patient-visits-list/patient-visit-panel/patient-visit-panel.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PatientRoutingModule } from './patient-routing.module';



@NgModule({
  declarations: [
    PatientComponent,
    NewVisitsComponent,
    PatientScheduleComponent,
    PatientVisitsListComponent,
    PatientVisitPanelComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
