import { Component, ViewChild } from '@angular/core';
import { VisitsListComponent } from '../../shared/schedule/visits-list/visits-list.component';

@Component({
	selector: 'app-new-visits',
	templateUrl: './new-visits.component.html',
	styleUrls: ['./new-visits.component.scss'],
})
export class NewVisitsComponent {
	@ViewChild(VisitsListComponent) visitList: VisitsListComponent;

	loadVisits(query: any) {
		query.appointment = 'available';
		query.type = 'active';
		this.visitList.loadVisits(query);
	}
}
