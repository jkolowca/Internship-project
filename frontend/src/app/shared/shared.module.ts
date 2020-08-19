import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { VisitsListComponent } from './components/schedule/visits-list/visits-list.component';
import { VisitAddPanelComponent } from './components/schedule/visits-list/visit-add-panel/visit-add-panel.component';
import { VisitDisplayPanelComponent } from './components/schedule/visits-list/visit-display-panel/visit-display-panel.component';
import { MaterialModule } from './material/material.module';
import { ClinicsService } from './services/clinics.service';
import { DoctorsService } from './services/doctors.service';
import { VisitsService } from './services/visits.service';

@NgModule({
	declarations: [ScheduleComponent, VisitsListComponent, VisitAddPanelComponent, VisitDisplayPanelComponent],
	imports: [CommonModule, SharedRoutingModule, MaterialModule],
	exports: [
		MaterialModule,
		ScheduleComponent,
		VisitsListComponent,
		VisitAddPanelComponent,
		VisitDisplayPanelComponent
	],
	providers: [ClinicsService, DoctorsService, VisitsService]
})
export class SharedModule {}
