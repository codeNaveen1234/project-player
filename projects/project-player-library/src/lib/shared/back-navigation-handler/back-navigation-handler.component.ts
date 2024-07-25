import { Component, HostListener } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  template: '',
})
export class BackNavigationHandlerComponent {

  constructor(private routingServ: RoutingService){}

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.handlePopState(event);
  }

  protected handlePopState(event: any) {
    let urlQueryParams = this.getQueryParams(event.target.location.search)
    this.routingServ.navigate(event.target.location.pathname, urlQueryParams)
  }

  getQueryParams(queryParams:any){
    const queryObj: any = {}

    if (queryParams.startsWith('?')) {
      queryParams = queryParams.substring(1);
    }

    const queryArray = queryParams.split('&');

    queryArray.forEach((query:any) => {
        const [key, value] = query.split('=');
        queryObj[key] = value 
    });
    return queryObj;
  }

}
