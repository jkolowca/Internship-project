import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ClinicsService } from 'src/app/shared/services/clinics.service';
import { DoctorsService } from 'src/app/shared/services/doctors.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	@Output() formSubmitted = new EventEmitter<Object>();
	searchForm: any;
	constructor(
		public fb: FormBuilder,
		private clinicsService: ClinicsService,
		private doctorsService: DoctorsService
	) {
		this.searchForm = this.fb.group({
			city: new FormControl(''),
			speciality: new FormControl(''),
			startDate: new FormControl(''),
			endDate: new FormControl('')
		});
	}

	availableClinics: string[];
	availableSpec: string[];

	ngOnInit(): void {
		this.doctorsService.getSpecialties().subscribe(l => (this.availableSpec = l));
		this.clinicsService.getCities().subscribe(l => (this.availableClinics = l));
	}

	onSubmit() {
		this.formSubmitted.emit(this.searchForm.value);
	}
}
