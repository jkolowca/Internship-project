import { Component, OnInit } from '@angular/core';
import {
	ClinicsService,
	DoctorsService,
	VisitsService,
} from 'src/app/services';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';


@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

	visits;
	searchForm: any;
	constructor( public fb: FormBuilder,
		private clinicsService: ClinicsService,
		private doctorsService: DoctorsService,
		private visitService: VisitsService
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


	onSubmit() {
		
			this.visitService.query=this.searchForm.value;
			console.log(this.searchForm.value);

			//this.visitService.getFiltered().subscribe(l => this.visits = l);
			//console.log(this.visits);
		
	}
}
