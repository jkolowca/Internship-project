import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DoctorsService } from '../../services/doctors.service';

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
	});
	specialties = this.doctor.get('specialties') as FormArray;

	constructor(private doctorsService: DoctorsService) {}

	ngOnInit(): void {
		this.addSpecialtie(0);
	}
	addSpecialtie(i: number): void {
		this.specialties.insert(
			i + 1,
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

	addDoctor(): void {
		console.log(`add Doctor`);
		const { name, surname, specialties } = this.doctor.value;
		this.doctorsService.add(name, surname, specialties, []).subscribe();

		window.location.reload();
	}
}
