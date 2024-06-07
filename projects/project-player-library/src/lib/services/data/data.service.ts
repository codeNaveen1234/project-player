import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private configuration: any

  constructor() {}

  setConfig(config:any){
    this.configuration = config
  }

  getConfig(){
    console.log('Data get config')
    return this.configuration
  }
}