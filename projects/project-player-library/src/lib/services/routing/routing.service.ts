import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  navigate(path:any,params?:any){
    if(params){
      this.router.navigate([path,params],{skipLocationChange:true})
    }else{
      this.router.navigate([path],{skipLocationChange:true})
    }
    
  }
}
