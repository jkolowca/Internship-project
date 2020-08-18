import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	signupForm: FormGroup;
	hide = true;

	constructor(
		public fb: FormBuilder,
		public authService: AuthService,
		public router: Router
	) {}

	ngOnInit(): void {
		this.signupForm = this.fb.group({
			name: ['', [Validators.required]],
			surname: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			email: ['', [Validators.required, Validators.email]],
		});
	}

	registerUser() {
		this.authService.signUp(this.signupForm.value).subscribe(() => {
			this.signupForm.reset(), this.router.navigate(['']);
		});
	}

	getErrorMessage(prop: string) {
		if (this.signupForm.controls[prop].hasError('required')) {
			return 'You must enter a value';
		} else if (this.signupForm.controls[prop].hasError('email')) {
			return 'Not a valid email';
		} else if (this.signupForm.controls[prop].hasError('minlength')) {
			return 'Minimum password length is 8';
		}
	}
}
