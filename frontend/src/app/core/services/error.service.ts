import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorService {
	error: Subject<any> = new Subject<any>();

	catchError(e: any) {
		this.error.next(e);
	}
}
