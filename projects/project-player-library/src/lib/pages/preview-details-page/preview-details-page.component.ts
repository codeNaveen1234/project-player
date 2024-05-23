import { Component } from '@angular/core';
import { projectDetailsData } from '../details-page/project-details.component.spec.data';
import { actions } from '../../constants/actionConstants';
import { RoutingService } from '../../services/routing/routing.service';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'lib-preview-details-page',
  templateUrl: './preview-details-page.component.html',
  styleUrl: './preview-details-page.component.css'
})
export class PreviewDetailsPageComponent {
  projectDetails:any ;
  actionsList = [];
  displayedTasks:any;
  remainingTasks = [];
  startImprovement: boolean = true;
  constructor(private routerService:RoutingService,private activatedRoute:ActivatedRoute,private db:DbService,private toasterService:ToastService){
    activatedRoute.params.subscribe(param=>{
      this.getData(param['id'])
    })
  }
  ngOnInit(): void {
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
    this.routerService.navigate(`/details/${this.projectDetails._id}`,);
    this.startImprovement = false;
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
}
