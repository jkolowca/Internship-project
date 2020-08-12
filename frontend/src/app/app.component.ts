import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	title = 'registration';

	constructor(
		private snackBar: MatSnackBar,
		private authService: AuthService
	) {}

	ngOnInit() {
		let snackBar = this.snackBar.open('Add mockup data?', 'Add', {
			duration: 5000,
		});
		snackBar.onAction().subscribe(() => {
			this.authService.getMockData().subscribe();
		});
	}
}
