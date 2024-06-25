import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';;
import { DataService } from '../../services/data/data.service';
import { ApiService } from '../../services/api/api.service';
import { apiUrls } from '../../constants/urlConstants';

@Component({
  selector: 'lib-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit {
  projectDetails:any;
  projectId:any;
  solutionId:any;
  @Input() projectData:any;
  @Input() config: any
  constructor(private routerService: RoutingService, private db: DbService, private apiService:ApiService, private dataService: DataService) {}

  ngOnInit() {
    setTimeout(()=>{
      if(this.projectData._id){
        this.projectId = this.projectData._id;
      } else {
        this.solutionId = this.projectData.solutionId;
      }
      this.storeDataToLocal()
      }, 1000)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataService.setConfig(changes['config'].currentValue)
  }

  navigateToDetails(){
    this.routerService.navigate(`/details/${this.projectId}`)
  }

  navigateToTemplate(){
    this.routerService.navigate(`/preview-details/${this.solutionId}`)
  }

  storeDataToLocal(){
    if(this.projectId){
      this.db.getData(this.projectId).then((data)=>{
        if(data){
          this.routerService.navigate(`/details/${this.projectId}`)
        }else{
          this.getProjectDetails()
        }      
        }).catch((res)=>{
          this.getProjectDetails()
      })
    }
    else {
      this.navigateToTemplate()
    }
  }

  getProjectDetails(){
    const configForProjectId = {
      url: `${apiUrls.GET_PROJECT_DETAILS}/${this.projectId}`,
      payload: {}
    }
      this.apiService.post(configForProjectId).subscribe((res)=>{
        this.projectDetails = res.result;
        if(this.projectDetails){
          let data = {
            key: this.projectDetails._id,
            data: this.projectDetails
          }
          this.db.addData(data)
          this.navigateToDetails()
        }
      })
  }

  ngOnDestroy(){
    this.dataService.clearConfig()
    this.routerService.navigate('/')
  }
}
