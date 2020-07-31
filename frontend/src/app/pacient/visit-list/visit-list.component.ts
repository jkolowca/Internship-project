import { Component, OnInit } from '@angular/core';
import { VisitsService } from '../../services/visits.service';
import { Visit } from '../../interfaces/visit';
import { Router } from '@angular/router';


@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent implements OnInit {

  constructor(private visitService: VisitsService, public router: Router) {}
  visitsList: Visit[];

  ngOnInit(): void {
    this.visitService
        .getAll()
        .subscribe(list => (this.visitsList = list));

  }

}
