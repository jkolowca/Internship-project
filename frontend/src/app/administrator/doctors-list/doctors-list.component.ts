import { Component, OnInit } from '@angular/core';
import { AdministratorsService } from '../../services/administrators.service';
import { Doctor } from '../../interfaces/doctor';

@Component({
	selector: 'app-doctors-list',
	templateUrl: './doctors-list.component.html',
	styleUrls: ['./doctors-list.component.scss'],
})
export class DoctorsListComponent implements OnInit {
	constructor(private administratorsService: AdministratorsService) {}
	doctorsList: Doctor[];

	ngOnInit(): void {
		this.administratorsService
			.getAllDoctors()
			.subscribe(list => (this.doctorsList = list));
	}
}
