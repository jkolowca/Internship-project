import { Injectable } from '@angular/core';
import { User } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	endpoint: string = 'http://localhost:5000/users';
	headers = new HttpHeaders().set('Content-Type', 'application/json');
	currentUser: string;
	access: string;

	constructor(private http: HttpClient, public router: Router) {
		let token = localStorage.getItem('currentUser');
		if (token) {
			let userData = JSON.parse(token);
			this.currentUser = userData._id;
			this.access = userData.access;
		}
	}

	getMockData() {
		return this.http
			.post<{ status: string }>(`http://localhost:5000/mockup`, {});
	}

	getCurrentUserProfile() {
		return this.getUserProfile(this.currentUser);
	}

	signUp(user: User): Observable<any> {
		return this.http
			.post<{ status: string }>(`${this.endpoint}/register-user`, user);
	}

	signIn(user: { email: string; password: string }) {
		let request = this.http
			.post<any>(`${this.endpoint}/signin`, user)
			.pipe(share());
		request.subscribe(res => {
			this.access = res.access;
			this.currentUser = res._id;
			localStorage.setItem('currentUser', JSON.stringify(res));
		});

		return request;
	}

	getUserProfile(id: string): Observable<User> {
		return this.http
			.get<User>(`${this.endpoint}/${id}`, { headers: this.headers });
	}

	doLogout() {
		let removeToken = localStorage.removeItem('currentUser');
		if (removeToken == null) {
			this.router.navigate(['']);
		}
	}
}