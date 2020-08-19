import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	template: '',
})
export class LogoutComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.doLogout();
	}
}
