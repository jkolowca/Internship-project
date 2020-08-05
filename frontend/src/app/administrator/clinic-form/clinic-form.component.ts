import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClinicsService } from '../../services';

@Component({
	selector: 'app-clinic-form',
	templateUrl: './clinic-form.component.html',
	styleUrls: ['./clinic-form.component.scss'],
})
export class ClinicFormComponent implements OnInit {
	clinic = this.fb.group({
		name: ['', [Validators.required]],
		city: ['', [Validators.required, Validators.maxLength(30)]],
		streetAddress: ['', [Validators.required, Validators.maxLength(30)]],
		apartment: ['', [Validators.required, Validators.maxLength(10)]],
	});

	constructor(
		private fb: FormBuilder,
		private clinicsService: ClinicsService
	) {}

	ngOnInit(): void {}

	addClinic(): void {
		const { name, city, street, streetNo } = this.clinic.value;
		this.clinicsService.addClinic(name, city, street, streetNo).subscribe();

		window.location.reload();
	}
}
