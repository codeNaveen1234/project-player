import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '../../services/routing/routing.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input()title:any
  @Input()params?:any
  queryParams:any = {}
  isPreview:boolean = false

  constructor(private router: Router, private routerService: RoutingService, private dataService: DataService){
    const navigationState = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.queryParams
    this.queryParams = navigationState
  }

  ngOnInit(){
    this.isPreview = this.dataService.getConfig().isPreview
  }

  goBack(){
    let navigationParams = this.params ? this.params : this.queryParams
    this.routerService.navigate("/project-details",navigationParams)
  }
}
