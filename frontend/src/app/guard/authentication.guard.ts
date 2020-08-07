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
			// check if route is restricted by role
			if (
				route.data.accountTypes &&
				route.data.accountTypes.indexOf(access) === -1
			) {
				// role not authorised so redirect to home page
				this.router.navigate(['/']);
				return false;
			}

			// authorised so return true
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/'], {
			queryParams: { returnUrl: state.url },
		});
		return false;
	}
}
