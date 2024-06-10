import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) {
  }

  get(config:any): Observable<any> {
    this.setHeaders()
    return this.http.get(`${this.baseUrl}/${config.url}`,{headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  post(config: any): Observable<any> {
    this.setHeaders()
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
      if (error.status === 401) {
        this.router.navigate(['/']);
      }
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  setHeaders(){
    let config = this.dataService.getConfig()
    this.token = config.accessToken
    this.baseUrl = config.baseUrl
    this.headers = {
      'Authorization': `Bearer ${config.accessToken}`,
      'x-auth-token': config.accessToken,
      'X-authenticated-user-token': config.accessToken,
      'Content-Type': 'application/json',
    }
  }
}
