import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';
import { projectDetailsData } from '../details-page/project-details.component.spec.data';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'lib-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit {
  projectDetails = projectDetailsData
  @Input() config: any

  constructor(private routerService: RoutingService, private db: DbService, private dataService: DataService) {}

  ngOnInit() {
    setTimeout(()=>{
      this.storeDataToLocal()
      }, 1000)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataService.setConfig(changes['config'].currentValue)
  }

  navigate(){
    this.routerService.navigate(`/details/${this.projectDetails._id}`)
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
