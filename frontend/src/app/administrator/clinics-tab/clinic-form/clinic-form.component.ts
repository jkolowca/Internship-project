import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClinicsService } from '../../../services';
import { ErrorPanelComponent } from 'src/app/error-panel/error-panel.component';

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
		const { name, city, street, streetNo } = this.clinic.value;
		this.clinicsService.addClinic(name, city, street, streetNo).subscribe(
			() => {},
			() => this.errorPanel.displayError('Failed to add clinic')
		);
		this.clinic.reset();
		this.clinicAdded.emit();
	}
}
