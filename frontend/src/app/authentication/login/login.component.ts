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
	) {
		this.signinForm = this.fb.group({
			password: new FormControl('', [
				Validators.required,
				Validators.min(8),
			]),
			email: new FormControl('', [Validators.required, Validators.email]),
		});
	}

	ngOnInit(): void {}

	loginUser() {
		this.authService.signIn(this.signinForm.value).subscribe((res: any) => {
			localStorage.setItem('access_token', res.token);
			this.authService.getUserProfile(res._id).subscribe(res => {
				this.authService.currentUser = res;
				this.router.navigate(['/patient/' + res._id]);
			});
		});
	}
}
