import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
	selector: 'app-administrator-top-panel',
	templateUrl: './administrator-top-panel.component.html',
	styleUrls: ['./administrator-top-panel.component.scss'],
})
export class AdministratorTopPanelComponent {

	constructor(private authService: AuthService) {}

	logout() {
		this.authService.doLogout();
	}
}


