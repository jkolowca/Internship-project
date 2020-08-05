import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services';

@Component({
	selector: 'app-registered-visits-list',
	templateUrl: './registered-visits-list.component.html',
	styleUrls: ['./registered-visits-list.component.scss'],
})
export class RegisteredVisitsListComponent implements OnInit {
  pacient: User;
  constructor(
    private authService: AuthService
  ) {}
  
  
    ngOnInit(): void {
      this.pacient = this.authService.currentUser;
    }

    logout() {
      this.authService.doLogout();
    }
  
  }
