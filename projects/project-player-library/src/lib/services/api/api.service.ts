import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '';
  constructor(private http: HttpClient,private dataService: DataService) {
  }
  get(config:any,headers?:HttpHeaders): Observable<any> {
    this.setHeaders();
    return this.http.get(`${this.baseUrl}/${config.url}`,{headers})
  }

  post(config: any,headers?:HttpHeaders): Observable<any> {
    this.setHeaders();
    return this.http.post(`${this.baseUrl}/${config.url}`, config.payload, {headers })
  }

  put(config: any,headers?:HttpHeaders): Observable<any> {
    return this.http.put(`${this.baseUrl}/${config.url}`, config.payload, {headers})
  }

  delete(config:any,headers?:HttpHeaders): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${config.url}`,{headers})
  }

  setHeaders(){
    let config = this.dataService.getConfig()
    this.baseUrl = config.baseUrl;
  }
}
