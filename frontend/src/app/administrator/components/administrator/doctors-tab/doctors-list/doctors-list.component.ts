import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { Doctor } from '../../../../../../../../common/interfaces';

@Component({
	selector: 'app-doctors-list',
	templateUrl: './doctors-list.component.html',
	styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {
	@Output() editDoctor = new EventEmitter<Doctor>();
	constructor(private doctorsService: DoctorsService) {}
	doctorsList: Doctor[];

	ngOnInit(): void {
		this.loadDoctors();
	}

	loadDoctors() {
		this.doctorsService.getAllDoctors().subscribe(list => (this.doctorsList = list));
	}
}
