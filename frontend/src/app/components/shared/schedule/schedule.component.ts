import { Component, ViewChild, OnInit } from '@angular/core';
import { VisitsListComponent } from './visits-list/visits-list.component';
import { Clinic, Doctor } from 'src/app/models/interfaces';
import { DoctorsService } from 'src/app/services';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
	@ViewChild('active') activeVisits: VisitsListComponent;
	@ViewChild('archived') archivedVisits: VisitsListComponent;
	doctor: Doctor;
	clinics: Clinic[];

	ngOnInit(): void {
		this.doctorsService.currentDoctor.subscribe(doctor => {
			this.doctor = doctor;
			if (doctor._id) {
				this.doctorsService.getClinics(doctor._id).subscribe(c => {
					this.clinics = c;
					this.loadVisits();
				});
			}
		});
	}

	constructor(private doctorsService: DoctorsService) {}

	loadVisits() {
		if (this.doctor) {
			this.activeVisits.loadVisits({
				type: 'active',
				doctor: this.doctor._id,
			});
			this.archivedVisits.loadVisits({
				type: 'archived',
				doctor: this.doctor._id,
			});
		}
	}
}
