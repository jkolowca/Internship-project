import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
	selector: 'app-administrator-top-panel',
	templateUrl: './administrator.component.html',
})
export class AdministratorComponent {
	constructor(private authService: AuthService) {}

	logout() {
		this.authService.doLogout();
	}
}
