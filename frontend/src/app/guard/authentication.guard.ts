import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';
import { AuthService } from '../services';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const access = this.authenticationService.access;
		if (access) {
			if (
				route.data.accountTypes &&
				route.data.accountTypes.indexOf(access) === -1
			) {
				this.router.navigate(['/']);
				return false;
			}

			return true;
		}

		this.router.navigate(['/'], {
			queryParams: { returnUrl: state.url },
		});
		return false;
	}
}
