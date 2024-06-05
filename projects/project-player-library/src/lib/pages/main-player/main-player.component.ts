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
      this.projectId = this.projectData._id;
      this.storeDataToLocal()
      }, 1000)
  }

  navigateToDetails(){
    this.routerService.navigate(`/details/${this.projectId}`)
  }

  navigateToTemplate(){
    this.routerService.navigate(`/preview-details/${this.projectId}`)
  }

  storeDataToLocal(){
    if(this.projectId){
      this.db.getData(this.projectId).then((data)=>{
        let projectDetails = data.data;
        if(projectDetails){
            this.routerService.navigate(`/details/${this.projectId}`)
          }
        }).catch((res)=>{
          this.getProjectDetails()
      })

    }
    else {
      this.getProjectTemplate()
    }
  }

  getProjectDetails(){
    console.log("this is from the function");
    const configForProjectId = {
      url: `${'project/v1/userProjects/details/'}${this.projectId}`,
      payload: {}
    }
      this.apiService.post(configForProjectId).subscribe((res)=>{
        console.log(res);
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
  getProjectTemplate(){
      const configForSolutionId = {
        url: `${'project/v1/solutions/getDetails/'}${this.solutionId}`,
        payload: {}
      }
      this.apiService.post(configForSolutionId).subscribe((res)=>{
        this.projectDetails = res.result;
        let data = {
          key: this.projectDetails._id,
          data: this.projectDetails
        }
        this.db.addData(data)
        this.navigateToTemplate()
      })
  }

  ngOnDestroy(): void {
    console.log("player destroyed");
  }
}
