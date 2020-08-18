import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ScheduleComponent } from './components/shared/schedule/schedule.component';
import { VisitsListComponent } from './components/shared/schedule/visits-list/visits-list.component';
import { VisitAddPanelComponent } from './components/shared/schedule/visits-list/visit-add-panel/visit-add-panel.component';
import { VisitDisplayPanelComponent } from './components/shared/schedule/visits-list/visit-display-panel/visit-display-panel.component';
import { MaterialModule } from './material/material.module';

@NgModule({
	declarations: [
		ScheduleComponent,
		VisitsListComponent,
		VisitAddPanelComponent,
		VisitDisplayPanelComponent,
	],
	imports: [CommonModule, SharedRoutingModule, MaterialModule],
	exports: [
		MaterialModule,
		ScheduleComponent,
		VisitsListComponent,
		VisitAddPanelComponent,
		VisitDisplayPanelComponent,
	],
})
export class SharedModule {}
