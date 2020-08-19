import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { ClinicsService } from 'src/app/shared/services/clinics.service';
import { Router } from '@angular/router';
import { Clinic } from '../../../../../../../../common/interfaces';

@Component({
	selector: 'app-doctor-form',
	templateUrl: './doctor-form.component.html',
	styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {
	@Input() doctorId: string;
	@Output() doctorSaved = new EventEmitter();
	doctor = this.fb.group({
		name: ['', [Validators.required]],
		surname: ['', [Validators.required]],
		specialties: this.fb.array([]),
		clinics: this.fb.array([])
	});

	specialties = this.doctor.get('specialties') as FormArray;
	clinics = this.doctor.get('clinics') as FormArray;
	availableClinics: Clinic[] = [];

	constructor(
		private fb: FormBuilder,
		private doctorsService: DoctorsService,
		private clinicsService: ClinicsService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getAvailableClinics();
		this.fillEditForm();
	}

	fillEditForm(): void {
		if (this.doctorId) {
			this.doctorsService.getById(this.doctorId).subscribe(doctor => {
				doctor.clinics.forEach(() => this.addClinic());
				doctor.specialties.forEach(() => this.addSpecialtie());
				const { _id, ...data } = doctor;
				this.doctor.setValue(data);
			});
			return;
		}
		this.addSpecialtie();
		this.addClinic();
	}

	getAvailableClinics(): void {
		this.clinicsService.getAllClinics().subscribe(l => (this.availableClinics = l));
	}

	addSpecialtie(): void {
		this.specialties.push(this.fb.control('', Validators.required));
	}

	removeSpecialtie(i: number): void {
		this.specialties.removeAt(i);
		if (!this.specialties.length) {
			this.addSpecialtie();
		}
	}

	addClinic(): void {
		this.clinics.push(this.fb.control('', Validators.required));
	}

	removeClinic(i: number): void {
		this.clinics.removeAt(i);
		if (!this.clinics.length) {
			this.addClinic();
		}
	}

	save(): void {
		const doctor = this.doctor.value;
		if (this.doctorId) {
			this.doctorsService.updateDoctor({ _id: this.doctorId, ...doctor }).subscribe();
			this.doctorSaved.emit();
			return;
		}
		this.doctorsService.addDoctor(doctor).subscribe();
		this.doctorSaved.emit();
	}

	deleteDoctor(): void {
		this.doctorsService.deleteDoctor(this.doctorId).subscribe(() => {
			this.router.navigateByUrl('/admin/doctors');
		});
	}

	openSchedule() {
		window.open(location.href + `/schedule`);
	}
}
