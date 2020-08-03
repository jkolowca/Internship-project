import { Component, OnInit } from '@angular/core';
import { Visit, Clinic } from '../../interfaces';
import { VisitsService } from 'src/app/services/visits.service';
import { ClinicsService } from 'src/app/services/clinics.service';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

	constructor(
		private clinicsService: ClinicsService,
		private doctorsService: DoctorsService) {}

		availableClinics: string[];
		availableSpec: string[];

	ngOnInit(): void {
		this.doctorsService.getSpecialties().subscribe(l => (this.availableSpec = l));
		this.clinicsService.getCities().subscribe(l => (this.availableClinics = l));
	}
}
