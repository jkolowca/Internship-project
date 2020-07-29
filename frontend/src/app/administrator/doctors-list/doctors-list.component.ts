import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { Doctor } from '../../interfaces/doctor';

@Component({
	selector: 'app-doctors-list',
	templateUrl: './doctors-list.component.html',
	styleUrls: ['./doctors-list.component.scss'],
})
export class DoctorsListComponent implements OnInit {
	constructor(private doctorsService: DoctorsService) {}
	doctorsList: Doctor[];

	ngOnInit(): void {
		this.doctorsService
			.getAll()
			.subscribe(list => (this.doctorsList = list));
	}
}
