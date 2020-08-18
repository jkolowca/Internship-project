import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { VisitsListComponent } from './visits-list/visits-list.component';
import { Clinic, Doctor } from 'src/app/models/interfaces';
import { DoctorsService } from 'src/app/services';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
	@ViewChildren(VisitsListComponent) visitsList: QueryList<
		VisitsListComponent
	>;
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
		this.visitsList.forEach(list => list.loadVisits());
	}
}
