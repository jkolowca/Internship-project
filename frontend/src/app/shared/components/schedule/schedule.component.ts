import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitsListComponent } from './visits-list/visits-list.component';
import { DoctorsService } from '../../services/doctors.service';
import { Clinic, Doctor } from '../../../../../../common/interfaces';

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
