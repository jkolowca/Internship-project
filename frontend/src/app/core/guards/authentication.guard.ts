import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const user = this.authenticationService.user;
		if (user) {
			if (
				route.data.accountTypes &&
				route.data.accountTypes.indexOf(user.accountType) === -1
			) {
				switch (user.accountType) {
					case 'patient':
						this.router.navigate(['/patient/', user._id]);
						break;
					case 'admin':
						this.router.navigate(['/admin']);
						break;
					case 'doctor':
						this.router.navigate(['/doctor/', user.doctorId]);
						break;
				}
				return false;
			}

			return true;
		}
		if (route.data.accountTypes.length === 0) return true;
		this.router.navigate(['/login'], {
			queryParams: { returnUrl: state.url },
		});
		return false;
	}
}
