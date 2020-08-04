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
pacient = <User>{};
constructor(
  private route: ActivatedRoute,
  private authService: AuthService
) {}


  ngOnInit(): void {
    const pacientId = this.route.snapshot.paramMap.get('idUser');
		this.authService
			.getUserById(pacientId)
			.subscribe(d => (this.pacient = d));
  }

}
