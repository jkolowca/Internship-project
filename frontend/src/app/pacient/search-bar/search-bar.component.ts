import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ViewChild,
	AfterViewInit,
} from '@angular/core';
import { ClinicsService, DoctorsService } from 'src/app/services';
import {
	FormBuilder,
	FormControl,
	Validators,
	AbstractControl,
} from '@angular/forms';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
	@Output() formSubmitted = new EventEmitter<Object>();
	//@ViewChild('form') form: AbstractControl;
	searchForm: any;
	constructor(
		public fb: FormBuilder,
		private clinicsService: ClinicsService,
		private doctorsService: DoctorsService
	) {
		this.searchForm = this.fb.group({
			city: new FormControl('', [Validators.required]),
			speciality: new FormControl('', [Validators.required]),
			startDate: new FormControl('', [Validators.required]),
			endDate: new FormControl('', [Validators.required]),
		});
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

	//ngAfterViewInit() {
	//	this.form.statusChanges.subscribe(status => {
	//		if (status === 'VALID') this.onSubmit();
	//	});
	//}
	onSubmit() {
		this.formSubmitted.emit(this.searchForm.value);
		//this.visitService.query=this.searchForm.value;
		//console.log(this.searchForm.value);
		//this.visitService.getFiltered().subscribe(l => this.visits = l);
		//console.log(this.visits);
	}
}
