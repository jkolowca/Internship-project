import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/interfaces';
import { VisitsService } from 'src/app/shared/services/visits.service';

@Component({
	selector: 'app-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
	registrationForm: FormGroup;
	visitId = this.route.snapshot.paramMap.get('id');
	userId = this.route.parent.snapshot.paramMap.get('id');

	constructor(
		private visitsService: VisitsService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		public fb: FormBuilder,
		public router: Router
	) {}

	ngOnInit(): void {
		this.registrationForm = this.fb.group({
			name: ['', [Validators.required]],
			surname: ['', [Validators.required]],
			reason: '',
		});
	}

	getErrorMessage(prop): string {
		if (prop.hasError('required')) {
			return 'You must enter a value';
		}
	}

	register(): void {
		const appointment: Appointment = this.registrationForm.value;
		appointment._id = this.userId;

		this.visitsService.register(this.visitId, appointment).subscribe(
			() => {
				this.snackBar.open('A doctor visit was agreed', 'End', {
					duration: 2000,
				});
				this.router.navigate(['../../registered-visits'], {
					relativeTo: this.route,
				});
			},
			err => {
				this.snackBar.open(
					'An appointment could not be made. Try again',
					'End',
					{
						duration: 3000,
					}
				);
			}
		);
	}
}
