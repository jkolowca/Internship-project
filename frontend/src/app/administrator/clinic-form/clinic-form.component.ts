import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdministratorsService } from '../../services/administrators.service';

@Component({
	selector: 'app-clinic-form',
	templateUrl: './clinic-form.component.html',
	styleUrls: ['./clinic-form.component.scss'],
})
export class ClinicFormComponent implements OnInit {
	clinic = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.max(15)]),
		city: new FormControl('', [Validators.required, Validators.max(15)]),
		street: new FormControl('', [Validators.required, Validators.max(15)]),
		streetNo: new FormControl('', [
			Validators.required,
			Validators.max(15),
		]),
	});

	constructor(private administratorsService: AdministratorsService) {}

	ngOnInit(): void {}

	addClinic(): void {
		const { name, city, street, streetNo } = this.clinic.value;
		this.administratorsService
			.addClinic(name, city, street, streetNo)
			.subscribe();

		window.location.reload();
	}
}
