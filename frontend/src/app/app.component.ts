import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorPanelComponent } from './core/components/error-panel/error-panel.component';
import { AuthService } from './core/services/auth.service';
import { ErrorService } from './core/services/error.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
	title = 'registration';
	@ViewChild(ErrorPanelComponent) errorPanel: ErrorPanelComponent;
	constructor(private snackBar: MatSnackBar, private authService: AuthService, private errorService: ErrorService) {}

	ngOnInit(): void {
		let snackBar = this.snackBar.open('Add mockup data?', 'Add', {
			duration: 5000
		});
		snackBar.onAction().subscribe(() => {
			this.authService.getMockData().subscribe();
		});
	}

	ngAfterViewInit(): void {
		this.errorService.error.subscribe(e => this.errorPanel.displayError(e));
	}
}
