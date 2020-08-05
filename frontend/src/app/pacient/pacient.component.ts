import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services';
import { User } from '../_models/interfaces';

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss']
})
export class PacientComponent implements OnInit {
pacient = {};
constructor(
  private route: ActivatedRoute,
  private authService: AuthService
) {}


  ngOnInit(): void {
    this.pacient = this.authService.currentUser;
  }

  logout() {
    this.authService.doLogout();
  }

}
