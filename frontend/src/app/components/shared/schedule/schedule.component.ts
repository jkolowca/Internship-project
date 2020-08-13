import {
	Component,
	Input,
	ViewChild,
	AfterViewInit,
	OnInit,
} from '@angular/core';
import { VisitsListComponent } from './visits-list/visits-list.component';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from 'src/app/models/interfaces';
import { DoctorsService } from 'src/app/services';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements AfterViewInit, OnInit {
	@ViewChild('active') activeVisits: VisitsListComponent;
	@ViewChild('archived') archivedVisits: VisitsListComponent;
	@Input() doctorId: string;
	clinics: Clinic[];
	constructor(
		private route: ActivatedRoute,
		private doctorsService: DoctorsService
	) {}

	ngOnInit() {
		if (this.doctorId)
			this.doctorsService
				.getClinics(this.doctorId)
				.subscribe(c => (this.clinics = c));
	}
	ngAfterViewInit() {
		if (this.doctorId) {
			this.activeVisits.loadVisits({
				type: 'active',
				doctor: this.doctorId,
			});
			this.archivedVisits.loadVisits({
				type: 'archived',
				doctor: this.doctorId,
			});
		} else {
			let patientId = this.route.parent.snapshot.paramMap.get('id');
			this.activeVisits.loadVisits({
				type: 'active',
				patient: patientId,
			});
			this.archivedVisits.loadVisits({
				type: 'archived',
				patient: patientId,
			});
		}
	}
}
