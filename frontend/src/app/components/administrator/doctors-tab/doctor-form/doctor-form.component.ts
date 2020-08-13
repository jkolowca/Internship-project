import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Clinic } from 'src/app/models/interfaces';
import { DoctorsService, ClinicsService } from 'src/app/services';
import { ErrorPanelComponent } from 'src/app/components/shared/error-panel/error-panel.component';

@Component({
	selector: 'app-doctor-form',
	templateUrl: './doctor-form.component.html',
	styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent implements OnInit {
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	@Input() doctorId: string;
	@Output() doctorSaved = new EventEmitter();
	doctor = this.fb.group({
		name: ['', [Validators.required]],
		surname: ['', [Validators.required]],
		specialties: this.fb.array([]),
		clinics: this.fb.array([]),
	});

	specialties = this.doctor.get('specialties') as FormArray;
	clinics = this.doctor.get('clinics') as FormArray;
	availableClinics: Clinic[] = [];

	constructor(
		private fb: FormBuilder,
		private doctorsService: DoctorsService,
		private clinicsService: ClinicsService
	) {}

	ngOnInit(): void {
		this.getAvailableClinics();
		this.fillEditForm();
	}

	fillEditForm(): void {
		if (this.doctorId) {
			this.doctorsService.getById(this.doctorId).subscribe(
				doctor => {
					doctor.clinics.forEach(() => this.addClinic());
					doctor.specialties.forEach(() => this.addSpecialtie());
					const { _id, ...values } = doctor;
					this.doctor.setValue(values);
				},
				e => this.errorPanel.displayError(e)
			);
			return;
		}
		this.addSpecialtie();
		this.addClinic();
	}

	getAvailableClinics(): void {
		this.clinicsService.getAllClinics().subscribe(
			l => (this.availableClinics = l),
			e => this.errorPanel.displayError(e)
		);
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
		const { name, surname, specialties, clinics } = this.doctor.value;
		if (this.doctorId) {
			this.doctorsService
				.updateDoctor({
					_id: this.doctorId,
					name,
					surname,
					specialties,
					clinics,
				})
				.subscribe(
					() => {},
					e => this.errorPanel.displayError(e)
				);

			this.doctorSaved.emit();
			return;
		}
		this.doctorsService
			.addDoctor(name, surname, specialties, clinics)
			.subscribe(
				() => {},
				e => this.errorPanel.displayError(e)
			);
		this.doctorSaved.emit();
	}

	deleteDoctor(): void {
		this.doctorsService.deleteDoctor(this.doctorId).subscribe(
			() => {},
			e => this.errorPanel.displayError(e)
		);
	}

	openSchedule() {
		window.open(location.href + `/schedule`);
	}
}
