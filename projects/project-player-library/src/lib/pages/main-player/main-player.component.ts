import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';
import { projectDetailsData } from '../details-page/project-details.component.spec.data';

@Component({
  selector: 'lib-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit {
  projectDetails = projectDetailsData

  constructor(private routerService: RoutingService, private db: DbService) {}

  ngOnInit() {
    setTimeout(()=>{
      this.storeDataToLocal()
      }, 1000)
  }

  navigate(){
    this.routerService.navigate(`/preview-details/${this.projectDetails._id}`)
  }

  storeDataToLocal(){
    let data = {
      key: this.projectDetails._id,
      data: this.projectDetails
    }
    this.db.addData(data)
    this.navigate()
  }

}
