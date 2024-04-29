import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  selector: 'lib-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit {

  constructor(private routerService: RoutingService) { }

  ngOnInit(): void {
    this.navigate()
  }

  navigate(){
    this.routerService.navigate('/details')
  }

}
