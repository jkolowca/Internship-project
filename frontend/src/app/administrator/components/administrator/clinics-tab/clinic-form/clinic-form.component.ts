import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClinicsService } from 'src/app/shared/services/clinics.service';

@Component({
	selector: 'app-clinic-form',
	templateUrl: './clinic-form.component.html',
	styleUrls: ['./clinic-form.component.scss']
})
export class ClinicFormComponent {
	@Output() clinicAdded = new EventEmitter();

	clinic = this.fb.group({
		name: ['', [Validators.required]],
		address: this.fb.group({
			city: ['', [Validators.required]],
			streetAddress: ['', [Validators.required]],
			apartment: ['']
		})
	});

	constructor(private fb: FormBuilder, private clinicsService: ClinicsService) {}

	addClinic(): void {
		this.clinicsService.addClinic(this.clinic.value).subscribe();
		this.clinic.reset();
		this.clinicAdded.emit();
	}
}
