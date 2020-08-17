import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ViewChild,
} from '@angular/core';
import { Doctor } from 'src/app/models/interfaces';
import { DoctorsService } from 'src/app/services';
import { ErrorPanelComponent } from 'src/app/components/shared/error-panel/error-panel.component';

@Component({
	selector: 'app-doctors-list',
	templateUrl: './doctors-list.component.html',
	styleUrls: ['./doctors-list.component.scss'],
})
export class DoctorsListComponent implements OnInit {
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	@Output() editDoctor = new EventEmitter<Doctor>();
	constructor(private doctorsService: DoctorsService) {}
	doctorsList: Doctor[];

	ngOnInit(): void {
		this.loadDoctors();
	}

	loadDoctors() {
		this.doctorsService.getAllDoctors().subscribe(
			list => (this.doctorsList = list),
			e => this.errorPanel.displayError(e)
		);
	}
}
