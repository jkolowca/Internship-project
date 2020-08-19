import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	signinForm: FormGroup;
	hide = true;

	constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {}

	ngOnInit(): void {
		this.signinForm = this.fb.group({
			password: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]]
		});
	}

	loginUser() {
		this.authService.signIn(this.signinForm.value).subscribe(() => {
			const user = this.authService.user;
			switch (user.accountType) {
				case 'patient':
					this.router.navigate(['/patient/', user._id]);
					break;
				case 'admin':
					this.router.navigate(['/admin']);
					break;
				case 'doctor':
					this.router.navigate(['/doctor/', user.doctorId]);
					break;
			}
		});
	}

	getErrorMessage(prop: string) {
		if (this.signinForm.controls[prop].hasError('required')) {
			return 'You must enter a value';
		} else if (this.signinForm.controls[prop].hasError('email')) {
			return 'Not a valid email';
		}
	}
}
