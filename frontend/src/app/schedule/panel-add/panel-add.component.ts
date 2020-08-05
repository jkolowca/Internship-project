import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DoctorsService } from 'src/app/_services/doctors.service';
import { Clinic } from 'src/app/_models/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VisitsService } from 'src/app/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-panel-add',
	templateUrl: './panel-add.component.html',
	styleUrls: ['./panel-add.component.scss'],
})
export class PanelAddComponent implements OnInit {
	@Input() doctorId: string;
	@Output() newVisit = new EventEmitter();
	availableClinics: Clinic[];
	state = 'display';

	form = new FormGroup({
		startDate: new FormControl(),
		endDate: new FormControl(),
		clinic: new FormControl(),
	});

	constructor(
		private doctorsService: DoctorsService,
		private visitsService: VisitsService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.doctorId = this.route.snapshot.paramMap.get('id');
		this.form.controls.startDate.setValue('', [Validators.required]);
		this.form.controls.endDate.setValue('', [Validators.required]);
		this.doctorsService.getClinics(this.doctorId).subscribe(clinics => {
			this.availableClinics = clinics;
			const toSelect = this.availableClinics[0];
			this.form.controls.clinic.setValue(toSelect);
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
