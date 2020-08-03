import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
signinForm = new FormGroup({
  password: new FormControl('', [Validators.required,Validators.min(8)]),
  email: new FormControl('', [Validators.required, Validators.email]),
})
  hide = true;
  constructor(public fb: FormBuilder,
    public authService: AuthService,
    
    public router: Router) { }

  ngOnInit(): void {
  }
     
  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }
  // getErrorMessage(prop): string {
  //   if (prop.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return prop.hasError('email') ? 'Not a valid email' : '';
  // }
}
