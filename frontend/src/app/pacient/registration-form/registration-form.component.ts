import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { VisitsService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/interfaces';

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
    public fb: FormBuilder,
    public router: Router,
	) {
}

	ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name : new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      reason: new FormControl(''),
  })
  }

	getErrorMessage(prop): string {
		if (prop.hasError('required')) {
			return 'You must enter a value';
		}
	}

	register(): void {
    const appointment: Appointment = this.registrationForm.value;
    appointment._id = this.idUser;

		this.visitsService.register(this.id, appointment).subscribe();
		this.snackBar.open('Umówiono wizytę', 'Koniec', {
			duration: 2000,
		});
		this.router.navigate(['../../registered-visits'], { relativeTo: this.route });
	}
}
