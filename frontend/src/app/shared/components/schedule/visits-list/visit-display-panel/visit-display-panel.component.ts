import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Visit, Clinic } from 'src/app/models/interfaces';
import { VisitsService } from 'src/app/shared/services/visits.service';

@Component({
	selector: 'app-visit-display-panel',
	templateUrl: './visit-display-panel.component.html',
	styleUrls: ['./visit-display-panel.component.scss'],
})
export class VisitDisplayPanelComponent implements OnInit {
	@Input() visit: Visit;
	@Input() clinics: Clinic[];
	@Output() visitDeleted = new EventEmitter();
	state = 'display';
	form: FormGroup;
	type: string;

	constructor(
		private fb: FormBuilder,
		private visitsService: VisitsService
	) {}

	ngOnInit(): void {
		const toSelect = this.clinics.find(
			c => c.name === this.visit.clinic.name
		);
		const date = new Date().toISOString().slice(0, 16);
		this.form = this.fb.group({
			startDate: [date, Validators.required],
			endDate: [date, Validators.required],
			clinic: [toSelect, Validators.required],
		});

		this.type =
			new Date().getTime() > new Date(this.visit.startDate).getTime()
				? 'archived'
				: 'active';
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
