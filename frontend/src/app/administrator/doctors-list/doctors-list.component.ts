import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services';
import { Doctor } from '../../models/interfaces';

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
			.getAllDoctors()
			.subscribe(list => (this.doctorsList = list.sort(compare)));
	}
}

function compare(a: Doctor, b: Doctor): number {
	if (a.surname < b.surname) {
		return -1;
	}
	if (a.surname > b.surname) {
		return 1;
	}
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}
