import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { PacientsService } from '../../services/pacients.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  reason = new FormControl('');
  id = this.route.snapshot.paramMap.get('id');

  constructor(private pacientsService: PacientsService, private route: ActivatedRoute ) { }

  ngOnInit(): void {}


  getErrorMessage(prop): string {
    if (prop.hasError('required')) {
      return 'You must enter a value';
    }
    return prop.hasError('email') ? 'Not a valid email' : '';
  }

   register(): void {
    const pacient = {
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      reason: this.reason.value
  };
    this.pacientsService.register(this.id, pacient).subscribe();
    console.log(pacient);
   }

}
