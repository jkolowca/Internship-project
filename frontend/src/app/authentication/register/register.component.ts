import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	Validators,
	FormGroup,
	FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	signupForm: any;
	hide = true;

	constructor(
		public fb: FormBuilder,
		public authService: AuthService,
		public router: Router
	) {
		this.signupForm = this.fb.group({
			name: new FormControl('', [Validators.required]),
			surname: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
		});
	}

	ngOnInit(): void {}

	registerUser() {
		this.authService.signUp(this.signupForm.value).subscribe(() => {
			this.signupForm.reset(), this.router.navigate(['']);
		});
	}
}
