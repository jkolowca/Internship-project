import { Component, OnInit } from '@angular/core';
import { Visit, Clinic } from '../../_models/interfaces';
import {
	VisitsService,
	ClinicsService,
	DoctorsService,
} from 'src/app/_services';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
	constructor(
		private clinicsService: ClinicsService,
		private doctorsService: DoctorsService
	) {}

	availableClinics: string[];
	availableSpec: string[];

	ngOnInit(): void {
		this.doctorsService
			.getSpecialties()
			.subscribe(l => (this.availableSpec = l));
		this.clinicsService
			.getCities()
			.subscribe(l => (this.availableClinics = l));
	}
}
