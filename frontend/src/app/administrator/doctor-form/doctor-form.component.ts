import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdministratorsService } from '../../services/administrators.service';
import { Clinic } from '../../interfaces/clinic';

@Component({
	selector: 'app-doctor-form',
	templateUrl: './doctor-form.component.html',
	styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent implements OnInit {
	doctor = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.max(15)]),
		surname: new FormControl('', [Validators.required, Validators.max(15)]),
		specialties: new FormArray([]),
		clinics: new FormArray([]),
	});

	specialties = this.doctor.get('specialties') as FormArray;
	clinics = this.doctor.get('clinics') as FormArray;
	availableClinics: Clinic[] = [];

	constructor(private administratorsService: AdministratorsService) {}

	ngOnInit(): void {
		this.getAvailableClinics();
		this.addSpecialtie(0);
		this.addClinic(0);
	}

	getAvailableClinics(): void {
		this.administratorsService
			.getAllClinics()
			.subscribe(l => (this.availableClinics = l));
	}

	addSpecialtie(i: number): void {
		this.specialties.insert(
			i,
			new FormControl('', {
				updateOn: 'change',
				validators: [Validators.required],
			})
		);
	}

	removeSpecialtie(i: number): void {
		this.specialties.removeAt(i);
		if (!this.specialties.length) {
			this.addSpecialtie(-1);
		}
	}

	addClinic(i: number): void {
		this.clinics.insert(
			i,
			new FormControl('', {
				updateOn: 'change',
				validators: [Validators.required],
			})
		);
	}

	removeClinic(i: number): void {
		this.clinics.removeAt(i);
		if (!this.clinics.length) {
			this.addClinic(-1);
		}
	}

	addDoctor(): void {
		const { name, surname, specialties, clinics } = this.doctor.value;
		this.administratorsService
			.addDoctor(name, surname, specialties, clinics)
			.subscribe();

		window.location.reload();
	}
}
