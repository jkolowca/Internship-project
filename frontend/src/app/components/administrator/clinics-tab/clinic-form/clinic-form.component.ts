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
		city: ['', [Validators.required]],
		streetAddress: ['', [Validators.required]],
		apartment: [''],
	});

	constructor(
		private fb: FormBuilder,
		private clinicsService: ClinicsService
	) {}

	ngOnInit(): void {}

	addClinic(): void {
		const { name, city, street, streetNo } = this.clinic.value;
		this.clinicsService.addClinic(name, city, street, streetNo).subscribe(
			() => {},
			() => this.errorPanel.displayError('Failed to add clinic')
		);
		this.clinic.reset();
		this.clinicAdded.emit();
	}
}
