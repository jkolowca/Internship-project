import { Component, OnInit, Input } from '@angular/core';
import { Visit, Clinic } from '../../interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
	selector: 'app-edit-panel',
	templateUrl: './edit-panel.component.html',
	styleUrls: ['./edit-panel.component.scss'],
})
export class EditPanelComponent implements OnInit {
	@Input() visit: Visit;
	startDate = new Date();
	endDate = new Date();
	availableClinics: Clinic[];

	form = new FormGroup({
		startDate: new FormControl('', [Validators.required]),
		endDate: new FormControl('', [Validators.required]),
		clinic: new FormControl('', [Validators.required]),
	});

	constructor(private doctorsService: DoctorsService) {}

	ngOnInit(): void {
		this.doctorsService
			.getDoctorClinics(this.visit.doctor._id)
			.subscribe(clinics => (this.availableClinics = clinics));
	}

	save() {
		this.startDate = new Date(this.form.controls.startDate.value);
		this.endDate = new Date(this.form.controls.endDate.value);
	}
}
