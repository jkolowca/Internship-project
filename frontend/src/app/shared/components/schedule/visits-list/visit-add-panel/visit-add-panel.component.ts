import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VisitsService } from 'src/app/shared/services/visits.service';
import { Clinic } from '../../../../../../../../common/interfaces';

@Component({
	selector: 'app-visit-add-panel',
	templateUrl: './visit-add-panel.component.html',
	styleUrls: ['./visit-add-panel.component.scss'],
})
export class VisitAddPanelComponent implements OnInit {
	@Input() doctorId: string;
	@Input() clinics: Clinic[];
	@Output() newVisit = new EventEmitter();
	state = 'display';

	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private visitsService: VisitsService
	) {}

	ngOnInit(): void {
		const date = new Date().toISOString().slice(0, 16);
		this.form = this.fb.group({
			startDate: [date, Validators.required],
			endDate: [date, Validators.required],
			clinic: [this.clinics[0], Validators.required],
		});
	}

	save() {
		const startDate = new Date(this.form.controls.startDate.value);
		const endDate = new Date(this.form.controls.endDate.value);
		const clinic = this.form.controls.clinic.value._id;

		console.log(this.doctorId);
		this.visitsService
			.addVisit(startDate, endDate, clinic, this.doctorId)
			.subscribe(() => this.newVisit.emit());
		this.state = 'display';
	}
}
