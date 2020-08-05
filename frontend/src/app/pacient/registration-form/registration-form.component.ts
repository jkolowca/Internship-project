import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { VisitsService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/_models/interfaces';

@Component({
	selector: 'app-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
	registrationForm: any;
	id = this.route.snapshot.paramMap.get('id');
	idUser = this.route.snapshot.paramMap.get('idUser');

	constructor(
		private visitsService: VisitsService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		public fb: FormBuilder
	) {
		this.registrationForm = this.fb.group({
			name: new FormControl('', [Validators.required]),
			surname: new FormControl('', [Validators.required]),
			reason: new FormControl(''),
		});
	}

	ngOnInit(): void {}

	getErrorMessage(prop): string {
		if (prop.hasError('required')) {
			return 'You must enter a value';
		}
	}

	register(): void {
		const patient: Appointment = this.registrationForm.value;

		this.visitsService.register(this.id, patient).subscribe();
		this.snackBar.open('Umówiono wizytę', 'Koniec', {
			duration: 2000,
		});
	}
}
