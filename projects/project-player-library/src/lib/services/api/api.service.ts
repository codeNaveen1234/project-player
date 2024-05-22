import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = ''
  private baseUrl = '';
  headers = {
    'Authorization': `Bearer ${this.token}`,
    'x-auth-token': this.token,
    'X-authenticated-user-token': this.token,
    'Content-Type': 'application/json',
  }

  constructor(private http: HttpClient) { }

  get(config:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${config.url}`,{headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  post(config: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${config.url}`, config.payload, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  put(config: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${config.url}`, config.payload, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  delete(config:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${config.url}`,{headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
