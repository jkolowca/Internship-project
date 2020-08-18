import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './components/patient/patient.component';
import { NewVisitsComponent } from './components/patient/new-visits/new-visits.component';
import { PatientScheduleComponent } from './components/patient/patient-schedule/patient-schedule.component';
import { PatientVisitsListComponent } from './components/patient/patient-schedule/patient-visits-list/patient-visits-list.component';
import { PatientVisitPanelComponent } from './components/patient/patient-schedule/patient-visits-list/patient-visit-panel/patient-visit-panel.component';
import { PatientRoutingModule } from './patient-routing.module';
import { SearchBarComponent } from './components/patient/search-bar/search-bar.component';
import { RegistrationFormComponent } from './components/patient/registration-form/registration-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		PatientComponent,
		NewVisitsComponent,
		PatientScheduleComponent,
		PatientVisitsListComponent,
		PatientVisitPanelComponent,
		SearchBarComponent,
		RegistrationFormComponent,
	],
	imports: [SharedModule, CommonModule, PatientRoutingModule],
})
export class PatientModule {}
