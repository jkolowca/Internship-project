import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services';
import { ErrorService } from './services/error.service';
import { ErrorPanelComponent } from './shared/components/shared/error-panel/error-panel.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
	title = 'registration';
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	constructor(
		private snackBar: MatSnackBar,
		private authService: AuthService,
		private errorService: ErrorService
	) {}

	ngOnInit(): void {
		let snackBar = this.snackBar.open('Add mockup data?', 'Add', {
			duration: 5000,
		});
		snackBar.onAction().subscribe(() => {
			this.authService.getMockData().subscribe();
		});
	}

	ngAfterViewInit(): void {
		this.errorService.error.subscribe(e => this.errorPanel.displayError(e));
	}
}
