import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/interfaces';
import { AuthService } from 'src/app/_services';



@Component({
  selector: 'app-registered-visits-list',
  templateUrl: './registered-visits-list.component.html',
  styleUrls: ['./registered-visits-list.component.scss']
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