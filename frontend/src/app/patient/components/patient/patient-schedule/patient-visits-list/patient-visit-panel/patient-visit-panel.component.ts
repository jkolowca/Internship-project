import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Visit } from 'src/app/models/interfaces';
import { Router } from '@angular/router';
import { VisitsService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-patient-visit-panel',
	templateUrl: './patient-visit-panel.component.html',
	styleUrls: ['./patient-visit-panel.component.scss'],
})
export class PatientVisitPanelComponent implements OnInit {
	@Input() visit: Visit;
	@Output() visitCanceled = new EventEmitter();
	type: string;
	now = new Date();
	constructor(
		public router: Router,
		private visitsService: VisitsService,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.type =
			new Date().getTime() > new Date(this.visit.startDate).getTime()
				? 'archived'
				: 'active';
	}

	delete(): void {
		this.visitsService.deleteAppointment(this.visit._id).subscribe();
		this.snackBar.open('Appointment canceled', 'Finish', {
			duration: 2000,
		});
		this.visitCanceled.emit();
	}
}
