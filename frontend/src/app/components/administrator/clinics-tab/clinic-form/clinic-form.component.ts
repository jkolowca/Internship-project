import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorPanelComponent } from 'src/app/components/shared/error-panel/error-panel.component';
import { ClinicsService } from 'src/app/services';
import { Address } from '../../../../models/interfaces';

@Component({
	selector: 'app-clinic-form',
	templateUrl: './clinic-form.component.html',
	styleUrls: ['./clinic-form.component.scss'],
})
export class ClinicFormComponent implements OnInit {
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	@Output() clinicAdded = new EventEmitter();

	clinic = this.fb.group({
		name: ['', [Validators.required]],
		city: ['', [Validators.required, Validators.maxLength(30)]],
		streetAddress: ['', [Validators.required, Validators.maxLength(30)]],
		apartment: ['', [Validators.maxLength(10)]],
	});

	constructor(
		private fb: FormBuilder,
		private clinicsService: ClinicsService
	) {}

	ngOnInit(): void {}

	addClinic(): void {
	  const name = this.clinic.controls.name.value;
	  const address: Address = {
	    city: this.clinic.controls.city.value,
	    streetAddress: this.clinic.controls.streetAddress.value,
	    apartment: this.clinic.controls.apartment.value
	  }
	  this.clinicsService.addClinic(name, address).subscribe(
	    () => {},
	    err => this.errorPanel.displayError('Failed to add clinic')
	  );
	  this.clinic.reset();
	  this.clinicAdded.emit();
	}
}
