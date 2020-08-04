import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import {
	NgxMatDatetimePickerModule,
	NgxMatTimepickerModule,
	NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
	exports: [
		MatExpansionModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatToolbarModule,
		MatSnackBarModule,
		MatTabsModule,
		MatAutocompleteModule,
		MatDividerModule,
		MatDatepickerModule,
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatNativeDateModule,
	],
})
export class MaterialModule {}
