import { Component, Inject } from '@angular/core';
import {
	MatBottomSheet,
	MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-error-panel',
	template: ``,
})
export class ErrorPanelComponent {
	constructor(private bottomSheet: MatBottomSheet) {}

	displayError(errorMessage: HttpErrorResponse): void {
		let message: string;
		if (errorMessage.error instanceof ErrorEvent) {
			message = `Error: ${errorMessage.error.message}`;
		} else {
			message = `Error Code: ${errorMessage.status} Message: ${errorMessage.message}`;
		}
		this.bottomSheet.open(BottomSheet, { data: message });
	}
}



@Component({
	selector: 'app-bottom-sheet',
	templateUrl: './error-panel.component.html',
	styleUrls: ['./error-panel.component.scss'],
})
export class BottomSheet {
	constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: string) {}
}
