import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../../../common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	endpoint: string = 'http://localhost:5000/users';
	user: User;

	constructor(private http: HttpClient, public router: Router) {}

	loadCurrentUser(): Promise<any> {
		let currentUser = localStorage.getItem('currentUser');
		const userData = JSON.parse(currentUser);
		return new Promise((resolve, reject) => {
			if (userData)
				this.getUserProfile(userData._id).subscribe(user => {
					this.user = user;
					resolve(true);
				});
			else resolve(true);
		});
	}

	getMockData() {
		return this.http.get<{ status: string }>(
			`http://localhost:5000/mockup`
		);
	}

	signUp(user: User): Observable<any> {
		return this.http.post<{ status: string }>(
			`${this.endpoint}/register-user`,
			user
		);
	}

	signIn(user: { email: string; password: string }) {
		let request = this.http
			.post<any>(`${this.endpoint}/signin`, user)
			.pipe(share());
		request.subscribe(res => {
			localStorage.setItem(
				'currentUser',
				JSON.stringify({ token: res.token, _id: res.user._id })
			);
			this.user = res.user;
		});
		return request;
	}

	getUserProfile(id: string): Observable<User> {
		return this.http.get<User>(`${this.endpoint}/${id}`);
	}

	doLogout() {
		let removeToken = localStorage.removeItem('currentUser');
		this.user = undefined;
		if (removeToken == null) {
			this.router.navigate(['/login']);
		}
	}
}
