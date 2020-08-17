import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	error: Subject<any> = new Subject<any>();

	catchError(e: any) {
		this.error.next(e);
	}
}
