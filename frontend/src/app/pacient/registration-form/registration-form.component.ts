import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Visit } from 'src/app/interfaces/visit';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  id: string;

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('email') ? 'Not a valid email' : '';
  }

  public register(): void {
  }

}
