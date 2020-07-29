import { Component, OnInit } from '@angular/core';
import { PacientsService } from '../../services/pacients.service';
import { Visit } from '../../interfaces/visit';


@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent implements OnInit {

  constructor(private pacientService: PacientsService) { }
  visitsList: Visit[];

  ngOnInit(): void {
    this.pacientService
        .getAll()
        .subscribe(list => (this.visitsList = list));
  }

}
