import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DoctorsService, VisitsService } from 'src/app/services';
import { Visit, Clinic } from 'src/app/models/interfaces';

@Component({
	selector: 'app-panel-admin',
	templateUrl: './panel-admin.component.html',
	styleUrls: ['./panel-admin.component.scss'],
})
export class PanelAdminComponent implements OnInit {
	@Input() visit: Visit;
	@Input() clinics: Clinic[];
	@Output() visitDeleted = new EventEmitter();
	state = 'display';
	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private datePipe: DatePipe,
		private doctorsService: DoctorsService,
		private visitsService: VisitsService
	) {}

	ngOnInit(): void {
		const toSelect = this.clinics.find(
			c => c.name === this.visit.clinic.name
		);
		this.form = this.fb.group({
			startDate: [
				this.datePipe.transform(
					this.visit.startDate,
					'yyy-MM-ddThh:mm'
				),
				Validators.required,
			],
			endDate: [
				this.datePipe.transform(this.visit.endDate, 'yyy-MM-ddThh:mm'),
				Validators.required,
			],
			clinic: [toSelect, Validators.required],
		});
	}

	save() {
		this.visit.startDate = new Date(this.form.controls.startDate.value);
		this.visit.endDate = new Date(this.form.controls.endDate.value);
		this.visit.clinic = this.form.controls.clinic.value;

		this.visitsService.editVisit(this.visit).subscribe();
		this.state = 'display';
	}

	cancel() {
		this.state = 'display';
	}

	delete() {
		this.visitsService.deleteVisit(this.visit._id).subscribe();
		this.visitDeleted.emit();
	}
}
