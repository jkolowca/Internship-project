import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VisitsService } from 'src/app/shared/services/visits.service';
import { Appointment } from '../../../../../../../common/interfaces';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
	registrationForm: FormGroup;
	visitId = this.route.snapshot.paramMap.get('id');
	userId = this.route.parent.snapshot.paramMap.get('id');
	surname: string;
	name: string;
	constructor(
		private visitsService: VisitsService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		public fb: FormBuilder,
		public router: Router,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.registrationForm = this.fb.group({
			reason: ''
		});
		this.authService.getUserProfile(this.userId).subscribe(l => {
			(this.name = l.name), (this.surname = l.surname);
		});
	}

	register(): void {
		const appointment: Appointment = this.registrationForm.value;
		appointment._id = this.userId;
		appointment.name = this.name;
		appointment.surname = this.surname;
		this.visitsService.register(this.visitId, appointment).subscribe(
			() => {
				this.snackBar.open('A doctor visit was agreed', 'End', {
					duration: 2000
				});
				this.router.navigate(['../../registered-visits'], {
					relativeTo: this.route
				});
			},
			err => {
				this.snackBar.open(
					'An appointment could not be made. Try again',
					'End',
					{
						duration: 3000
					}
				);
			}
		);
	}
}
