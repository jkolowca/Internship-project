import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  surname: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required, Validators.min(8)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  
  })
  hide = true;

  constructor( public fb: FormBuilder,
    public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe();
    this.signupForm.reset();
    this.router.navigate(['']);
  }
}
