import { Inject, Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import {API_URL} from '../../injectables';
import { leafNodes } from 'src/app/core/utils';
import { GlobalStateService } from './global-state.service';
@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(@Inject(API_URL) private apiUrl: string,private gss: GlobalStateService, private http: HttpClient) {}

  get<T>(endPoint: string, paramMap?: Map<string, string[]>|ParamMap): Observable<T> {
    this.gss.setIsLoading(true);
    const query: string = [this.apiUrl, endPoint].join('');
    let options = {};
    if (paramMap) {
      let httpParams = new HttpParams();
      if( paramMap instanceof Map) {
        (paramMap as Map<string, string[]>).forEach((value, key) => {
          httpParams = httpParams.set(key, value.join(','));
        });
      } else {
        paramMap.keys.forEach(key => {
          httpParams = httpParams.set(key, paramMap.get(key));
        })
      }

      options = { params: httpParams };
    }
    return this.http.get<T>(query, options).pipe(tap(() =>this.gss.setIsLoading(false)));
  }
  post<T>(endPoint: string, payload: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const query: string = [this.apiUrl, endPoint].join('');
    return this.http.post<T>(query, payload, httpOptions).pipe(
      catchError(error => this.handleError(error)));
  }
  patch<T>(endPoint: string, payload: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const query: string = [this.apiUrl, endPoint].join('');
    return this.http.patch<T>(query, payload, httpOptions).pipe(
      catchError(error => this.handleError(error)));
  }

  delete(endPoint: string):Observable<any> {
    const query: string = [this.apiUrl, endPoint].join('');
    return this.http.delete(query).pipe(
      catchError(error => this.handleError(error))); 
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      
    }
    // Return an observable with a user-facing error message.
    return throwError(leafNodes(error.error));
  }

}
