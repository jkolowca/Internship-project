import { Component, OnInit } from '@angular/core';

import { DoctorsService } from 'src/app/services';
import { Doctor } from '../../../../../../../../../common/interfaces';

@Component({
	selector: 'app-edit-tab',
	templateUrl: './edit-tab.component.html',
	styleUrls: ['./edit-tab.component.scss'],
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
