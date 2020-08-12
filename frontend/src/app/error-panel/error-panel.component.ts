import { Component, OnInit, Inject } from '@angular/core';
import {
	MatBottomSheet,
	MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
	selector: 'app-error-panel',
	template: ``,
})
export class ErrorPanelComponent {
	constructor(private bottomSheet: MatBottomSheet) {}

	displayError(errorMessage: string): void {
		this.bottomSheet.open(BottomSheet, { data: errorMessage });
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
