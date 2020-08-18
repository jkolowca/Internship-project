import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitsListComponent } from './visits-list/visits-list.component';
import { Clinic } from '../../../../../../../common/interfaces';
import { Doctor } from '../../../../../../../common/interfaces';
import { DoctorsService } from 'src/app/services';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
	@ViewChild(VisitsListComponent) visitsList: VisitsListComponent;
	doctor: Doctor;
	clinics: Clinic[];

	ngOnInit(): void {
		this.doctorsService.currentDoctor.subscribe(doctor => {
			this.doctor = doctor;
			if (doctor._id) {
				this.doctorsService.getClinics(doctor._id).subscribe(c => {
					this.clinics = c;
				});
			}
		});
	}

	constructor(private doctorsService: DoctorsService) {}

	loadVisits() {
		this.visitsList.loadVisits();
	}
}
