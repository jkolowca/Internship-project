import { Injectable } from '@angular/core';
import { User } from '../_models/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	endpoint: string = 'http://localhost:5000/users';
	headers = new HttpHeaders().set('Content-Type', 'application/json');
	currentUser = {};

	constructor(private http: HttpClient, public router: Router) {}

	signUp(user: User): Observable<any> {
		let api = `${this.endpoint}/register-user`;
		return this.http.post(api, user).pipe(catchError(this.handleError));
	}

	signIn(user: User) {
		return this.http
			.post<any>(`${this.endpoint}/signin`, user).pipe(catchError(this.handleError));		
	}

	getUserProfile(id: any): Observable<any> {
		let api = `${this.endpoint}/${id}`;
		return this.http.get(api, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.handleError)
		);
	}

	doLogout() {
		let removeToken = localStorage.removeItem('access_token');
		if (removeToken == null) {
		  this.router.navigate(['']);
		}
	  }

	handleError(error: HttpErrorResponse) {
		let msg = '';
		if (error.error instanceof ErrorEvent) {
			msg = `Error: ${error.error.message}`;
		} else {
			msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(msg);
	}
}
