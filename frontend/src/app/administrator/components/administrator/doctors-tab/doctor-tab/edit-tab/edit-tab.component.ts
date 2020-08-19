import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { Doctor } from '../../../../../../../../../common/interfaces';

@Component({
	selector: 'app-edit-tab',
	templateUrl: './edit-tab.component.html',
})
export class EditTabComponent implements OnInit {
	constructor(private doctorsService: DoctorsService) {}

	ngOnInit(): void {
		this.doctorsService.currentDoctor.subscribe(
			doctor => (this.doctor = doctor)
		);
	}

	doctor: Doctor;
}
