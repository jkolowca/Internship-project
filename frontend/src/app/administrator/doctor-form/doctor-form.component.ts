import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdministratorsService } from '../../services/administrators.service';
import { Clinic } from '../../interfaces/clinic';
import { Location } from '@angular/common';

@Component({
	selector: 'app-doctor-form',
	templateUrl: './doctor-form.component.html',
	styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent implements OnInit {
	@Input() doctorId: string;
	doctor = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.max(15)]),
		surname: new FormControl('', [Validators.required, Validators.max(15)]),
		specialties: new FormArray([]),
		clinics: new FormArray([]),
	});

	specialties = this.doctor.get('specialties') as FormArray;
	clinics = this.doctor.get('clinics') as FormArray;
	availableClinics: Clinic[] = [];

	mySubscription: any;

	constructor(
		private administratorsService: AdministratorsService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getAvailableClinics();
		if (this.doctorId) {
			this.setupDoctorEdit();
		} else {
			this.addSpecialtie(0);
			this.addClinic(0);
		}
	}

	setupDoctorEdit(): void {
		this.administratorsService
			.getDoctorById(this.doctorId)
			.subscribe(doctor => {
				doctor.specialties.forEach((_, idx) => {
					this.addSpecialtie(idx);
				});
				doctor.clinics.forEach((_, idx) => {
					this.addClinic(idx);
				});
				const { _id, ...values } = doctor;
				this.doctor.setValue(values);
			});
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

	save(): void {
		const { name, surname, specialties, clinics } = this.doctor.value;
		if (this.doctorId) {
			this.administratorsService
				.updateDoctor({
					_id: this.doctorId,
					name,
					surname,
					specialties,
					clinics,
				})
				.subscribe();

			this.location.back();
			return;
		}
		this.administratorsService
			.addDoctor(name, surname, specialties, clinics)
			.subscribe();
		location.reload();
	}

	deleteDoctor(): void {
		this.administratorsService.deleteDoctor(this.doctorId).subscribe();
		this.location.back();
	}
}
