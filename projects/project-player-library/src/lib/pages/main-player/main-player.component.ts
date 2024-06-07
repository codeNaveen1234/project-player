import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api/api.service';

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
  constructor(private routerService: RoutingService, private db: DbService,private http: HttpClient,private apiService:ApiService) {}

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

  navigateToDetails(){
    this.routerService.navigate(`/details/${this.projectId}`)
  }

  navigateToTemplate(){
    this.routerService.navigate(`/preview-details/${this.solutionId}`)
  }

  storeDataToLocal(){
    if(this.projectId){
      this.db.getData(this.projectId).then((data)=>{
            this.routerService.navigate(`/details/${this.projectId}`)
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
      url: `${'project/v1/userProjects/details/'}${this.projectId}`,
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



}
