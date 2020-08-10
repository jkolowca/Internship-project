import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	signupForm: any;
	hide = true;

  constructor( public fb: FormBuilder,
    private snackBar: MatSnackBar, public authService: AuthService, public router: Router) {
     }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      
      })
  }

	registerUser() {
		this.authService.signUp(this.signupForm.value).subscribe(() => {
			this.signupForm.reset(), this.router.navigate(['']);
    },
    () => {
      this.snackBar.open('Failed to register. Try again', 'End', {
        duration: 3000,
        });
    });
  }
  
  getErrorMessage(prop: string) {
    if (this.signupForm.controls[prop].hasError('required')) {
      return 'You must enter a value';
    }
    return this.signupForm.controls[prop].hasError('email') ? 'Not a valid email' : 'Minimum password length is 8';
  }
}
