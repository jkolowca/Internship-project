import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ErrorPanelComponent } from './components/shared/error-panel/error-panel.component';
import { ScheduleComponent } from './components/shared/schedule/schedule.component';
import { VisitsListComponent } from './components/shared/schedule/visits-list/visits-list.component';
import { VisitAddPanelComponent } from './components/shared/schedule/visits-list/visit-add-panel/visit-add-panel.component';
import { VisitDisplayPanelComponent } from './components/shared/schedule/visits-list/visit-display-panel/visit-display-panel.component';


@NgModule({
  declarations: [
    ErrorPanelComponent,
    ScheduleComponent,
    VisitsListComponent,
    VisitAddPanelComponent,
    VisitDisplayPanelComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    ErrorPanelComponent,
    ScheduleComponent,
    VisitsListComponent,
    VisitAddPanelComponent,
    VisitDisplayPanelComponent
  ]
})
export class SharedModule { }
