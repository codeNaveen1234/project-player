import { Component, SimpleChanges } from '@angular/core';
import { actions } from '../../constants/actionConstants';
import { RoutingService } from '../../services/routing/routing.service';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { ApiService } from '../../services/api/api.service';
import { apiUrls } from '../../constants/urlConstants';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'lib-preview-details-page',
  templateUrl: './preview-details-page.component.html',
  styleUrl: './preview-details-page.component.css'
})
export class PreviewDetailsPageComponent {
  projectDetails:any;
  actionsList = [];
  displayedTasks:any;
  remainingTasks = [];
  startImprovement: boolean = true;
  solutionId:any;
  constructor(private routerService:RoutingService,private activatedRoute:ActivatedRoute,private db:DbService,private apiService:ApiService,private dataService: DataService){
    activatedRoute.params.subscribe(param=>{
     this.solutionId = param['id']
     this.getProjectTemplate()
      this.setActionsList();
      this.initializeTasks()
    })
  }
  ngOnInit(): void {
  }

  getProjectTemplate(){
    const configForSolutionId = {
      url: `${'project/v1/solutions/getDetails/'}${this.solutionId}`,
      payload: {}
    }
    this.apiService.post(configForSolutionId).subscribe((res)=>{
      this.projectDetails = res.result;
    })
}
  getData(id:any){
    this.db.getData(id).then(data=>{
      this.projectDetails = data.data;
      this.setActionsList();
      this.initializeTasks()
    })
  }
  setActionsList(){
    let optionList:any = actions.ACTION_LIST;
    this.actionsList = optionList;
  }
  taskCardAction(event:any){
      console.log(event,"shared");
  }
  navigate(){
    this.startImprovement = false;
    this.getProjectDetails()
  }
  onLearningResources(){
    console.log("learning reources");
  }
  onStartObservation(){
    console.log("start observation");
  }
  initializeTasks(): void {
    if (this.projectDetails.tasks && this.projectDetails.tasks.length > 0) {
      this.displayedTasks = this.projectDetails.tasks.slice(0, 4);
      this.remainingTasks = this.projectDetails.tasks.slice(4);
    }
  }

  loadMoreTasks(): void {
    if (this.remainingTasks.length > 0) {
      this.displayedTasks.push(...this.remainingTasks);
      this.remainingTasks = [];
    }
  }

  getProjectDetails(){
    const configForProjectId = {
      url: `${apiUrls.GET_PROJECT_DETAILS}${this.solutionId}`,
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
          this.routerService.navigate(`/details/${this.solutionId}`);
        }
      })
  }

  startImprovementProgram(data:Event){
    if(data){
      this.navigate();
    }
  }
}
