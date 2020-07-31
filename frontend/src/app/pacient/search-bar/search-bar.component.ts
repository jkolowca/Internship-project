import { Component, OnInit } from '@angular/core';
import { Visit, Clinic } from '../../interfaces';
import { VisitsService } from 'src/app/services/visits.service';
import { ClinicsService } from 'src/app/services/clinics.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
	city: string;
	visits: Visit[];
	specialties: string[];
	constructor(private visitService: VisitsService,
		private clinicsService: ClinicsService,
		private doctorsService: DoctorsService) {}

		availableClinics: Clinic[] = [];
		availableSpec: string[]=[];
		uniqe: string[]=[];

	ngOnInit(): void {
		this.visitService.getAll().subscribe(list => (this.visits = list));
		this.getAvailableClinics();
		this.doctorsService.getSpecialties().subscribe(l => (this.specialties = l));
		console.log(this.specialties);
	}

	getAvailableClinics(): void {
		this.clinicsService
			.getAllClinics()
			.subscribe(l => (this.availableClinics = l));
	}

	getSpec

}
