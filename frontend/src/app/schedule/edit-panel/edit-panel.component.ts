import { Component, OnInit, Input } from '@angular/core';
import { Visit, Clinic } from '../../interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorsService } from 'src/app/services/doctors.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
	selector: 'app-edit-panel',
	templateUrl: './edit-panel.component.html',
	styleUrls: ['./edit-panel.component.scss'],
})
export class EditPanelComponent implements OnInit {
	@Input() visit: Visit;
	availableClinics: Clinic[];

	form = new FormGroup({
		startDate: new FormControl(),
		endDate: new FormControl(),
		clinic: new FormControl(),
	});

	constructor(
		private doctorsService: DoctorsService,
		private visitsService: VisitsService
	) {}

	ngOnInit(): void {
		this.form.controls.startDate.setValue(this.visit.startDate, [
			Validators.required,
		]);
		this.form.controls.endDate.setValue(this.visit.endDate, [
			Validators.required,
		]);
		this.doctorsService
			.getDoctorClinics(this.visit.doctor._id)
			.subscribe(clinics => {
				this.availableClinics = clinics;
				const toSelect = this.availableClinics.find(
					c => c.name === this.visit.clinic.name
				);
				this.form.controls.clinic.setValue(toSelect);
			});
	}

	save() {
		this.visit.startDate = new Date(this.form.controls.startDate.value);
		this.visit.endDate = new Date(this.form.controls.endDate.value);
		this.visit.clinic = this.form.controls.clinic.value;

		this.visitsService.editVisit(this.visit).subscribe();
	}
}
