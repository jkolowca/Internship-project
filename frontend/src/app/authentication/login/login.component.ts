import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	signinForm: any;
	hide = true;
	constructor(
		public fb: FormBuilder,
		public authService: AuthService,
		public router: Router
	) {}

	ngOnInit(): void {
		this.signinForm = this.fb.group({
			password: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
		});
	}

	async loginUser() {
		this.authService.signIn(this.signinForm.value).subscribe(_ => {
			this.authService.getCurrentUserProfile().subscribe(user => {
				switch (user.accountType) {
					case 'patient':
						this.router.navigate(['/patient/', user._id]);
						break;
					case 'admin':
						this.router.navigate(['/admin']);
						break;
					case 'doctor':
						this.router.navigate(['/doctor']);
						break;
				}
			});
		});
	}

	getErrorMessage(prop: string) {
		if (this.signinForm.controls[prop].hasError('required')) {
			return 'You must enter a value';
		}
		return this.signinForm.controls[prop].hasError('email')
			? 'Not a valid email'
			: '';
	}
}
