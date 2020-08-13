import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Clinic } from 'src/app/models/interfaces';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VisitsService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-panel-add',
	templateUrl: './panel-add.component.html',
	styleUrls: ['./panel-add.component.scss'],
})
export class PanelAddComponent implements OnInit {
	@Input() doctorId: string;
	@Input() clinics: Clinic[];
	@Output() newVisit = new EventEmitter();
	state = 'display';

	form: FormGroup;

	constructor(
		private datePipe: DatePipe,
		private fb: FormBuilder,
		private visitsService: VisitsService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.doctorId = this.route.snapshot.paramMap.get('id');
		this.form = this.fb.group({
			startDate: [
				this.datePipe.transform(new Date(), 'yyy-MM-ddThh:mm'),
				Validators.required,
			],
			endDate: [
				this.datePipe.transform(new Date(), 'yyy-MM-ddThh:mm'),
				Validators.required,
			],
			clinic: [this.clinics[0], Validators.required],
		});
	}

	save() {
		const startDate = new Date(this.form.controls.startDate.value);
		const endDate = new Date(this.form.controls.endDate.value);
		const clinic = this.form.controls.clinic.value._id;

		this.visitsService
			.addVisit(startDate, endDate, clinic, this.doctorId)
			.subscribe(_ => this.newVisit.emit());
		this.state = 'display';
	}
}
