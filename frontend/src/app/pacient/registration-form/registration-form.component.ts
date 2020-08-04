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
  reason = new FormControl('');
  id = this.route.snapshot.paramMap.get('id');
  idUser = this.route.snapshot.paramMap.get('idUser');

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
  }

  register(): void {
    const pacient = {
      appointment: {
        _id: this.idUser,
        name: this.name.value,
        surname: this.surname.value,
        reason: this.reason.value
      }
    };
    this.visitsService.register(this.id, pacient).subscribe();
    this.snackBar.open('Umówiono wizytę', 'Koniec', {
      duration: 2000 });
  }
  }
