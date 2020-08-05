import { Component, OnInit } from '@angular/core';
import { Visit, Clinic } from '../../_models/interfaces';
import {
	VisitsService,
	ClinicsService,
	DoctorsService,
} from 'src/app/_services';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

	searchForm: any;
	constructor( public fb: FormBuilder,
		private clinicsService: ClinicsService,
		private doctorsService: DoctorsService
	) {
		this.searchForm = this.fb.group({
			city: new FormControl('', [Validators.required]),
			specialty: new FormControl('', [Validators.required]),
			startDate: new FormControl('', [Validators.required]),
			endDate: new FormControl('', [Validators.required]),
			
			})
	}

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
