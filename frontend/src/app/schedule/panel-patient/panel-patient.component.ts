import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitsService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-panel-patient',
	templateUrl: './panel-patient.component.html',
	styleUrls: ['./panel-patient.component.scss'],
})
export class PanelPatientComponent implements OnInit {

	@Input() visit: Visit;
	constructor(private route: ActivatedRoute,
		public router: Router,
		private visitsService: VisitsService,
		private snackBar: MatSnackBar) {}

	ngOnInit(): void {
	}

	idUser = this.route.snapshot.paramMap.get('idUser');

	delete(): void {
			this.visitsService.deleteAppointment(this.visit._id).subscribe();
			this.snackBar.open('Usunięto wizytę', 'Koniec', {
				duration: 2000,
			});
			this.router.navigate(['../'], { relativeTo: this.route });
		}
}
