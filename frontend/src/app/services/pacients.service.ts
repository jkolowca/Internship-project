import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Visit } from '../interfaces/visit';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacientsService {

  private visitsUrl = 'http://localhost:5000/visits';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Visit[]> {
		return this.http
			.get<Visit[]>(this.visitsUrl)
			.pipe(catchError(this.handleError<Visit[]>('getAll', [])));
  }

  register(visit: Visit): Observable<any> {
    return this.http
      .patch(`${this.visitsUrl}/${visit._id}`, visit)
      .pipe(catchError(this.handleError<Visit>('editVisit')));
  }

  private handleError<T>(
		operation?: string,
		result?: T
	): (a: any) => Observable<T> {
		return (error: any): Observable<T> => {
			console.error(`${error} at: ${operation}`);
			return of(result as T);
		};
	}
}
