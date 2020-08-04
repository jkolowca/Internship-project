import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VisitsService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
	name = new FormControl('', [Validators.required]);
	surname = new FormControl('', [Validators.required]);
	email = new FormControl('', [Validators.required, Validators.email]);
	reason = new FormControl('');
	id = this.route.snapshot.paramMap.get('id');
	massage = 'Umówiono wizytę';

	constructor(
		private visitsService: VisitsService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {}

	getErrorMessage(prop): string {
		if (prop.hasError('required')) {
			return 'You must enter a value';
		}
		return prop.hasError('email') ? 'Not a valid email' : '';
	}

	register(): void {
		const pacient = {
			appointment: {
				name: this.name.value,
				surname: this.surname.value,
				email: this.email.value,
				reason: this.reason.value,
			},
		};
		this.visitsService.register(this.id, pacient).subscribe();
		this.snackBar.open('Umówiono wizytę', 'Koniec', {
			duration: 2000,
		});
	}
}
