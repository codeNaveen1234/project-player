import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { actions } from '../../constants/actionConstants';
import { DbService } from '../../services/db/db.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { UtilsService } from '../../services/utils/utils.service';
import { statusType } from '../../constants/statusConstants';

@Component({
  selector: 'lib-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnInit {
  completedCount: number = 0;
  progressValue: number = 0;
  actionsList = [];
  projectActions = []
  submitted: boolean = false;
  projectDetails:any;
  displayedTasks:any[]=[];
  remainingTasks:any[]=[];
  constructor(private routerService: RoutingService, private db: DbService, private activatedRoute: ActivatedRoute,
    private toasterService:ToastService, private utils: UtilsService
  ) {
    activatedRoute.params.subscribe(param=>{
      setTimeout(()=>{ },100)
      this.getData(param['id'])
    })
  }

  ngOnInit(): void {
  }

  getData(id:any){
    this.db.getData(id).then(data=>{
      this.projectDetails = data.data
      this.submitted = data.data.status == statusType.submitted
      this.countCompletedTasks(this.projectDetails);
      this.calculateProgress();
      this.setActionsList()
      this.initializeTasks()
    })
  }

  countCompletedTasks(projectDetails: any): number {
    if (
      projectDetails &&
      projectDetails.tasks &&
      projectDetails.tasks.length > 0
    ) {
      projectDetails.tasks.forEach((task: any) => {
        if (task.status === 'completed') {
          this.completedCount++;
        }
      });
    }

    return this.completedCount;
  }
  calculateProgress(): void {
    if (this.projectDetails.tasks.length > 0) {
      this.progressValue =
        (this.completedCount / this.projectDetails.tasks.length) * 100;
    }
  }
  submitImprovement() {
    this.routerService.navigate(`/add-files/${this.projectDetails._id}`)
  }

  navigateToNewTask() {
    this.routerService.navigate(`/add-task/${this.projectDetails._id}`)
  }

  taskCardAction(event:any){
    switch (event.action) {
      case 'edit':
        this.moveToDetailsTask(event._id);
        break;

      case 'share':
        this.openDialog()
        break;

      case 'delete':
        this.openDialogForDelete(event._id);
        break;

      default:
        break;
    }
  }

  moveToDetailsTask(taskId: any) {
    if (!this.submitted) {
      this.routerService.navigate(`/task-details/${taskId}/${this.projectDetails._id}`);
  }
  }

  iconListAction(event: any) {
    switch (event.action) {
      case "download":
        this.projectDetails.downloaded = true
        this.setActionsList()
        this.toasterService.showToast("PROJECT_DOWNLOADING_SUCCESS","success")
        break;

      case "share":
        this.openDialog()
        break;

      case "files":
        this.moveToFiles()
        break;

      case "sync":
        this.routerService.navigate('/sync',{projectId:this.projectDetails._id})
        break;

      default:
        break;
    }
  }

    moveToFiles() {
    this.routerService.navigate(`/files/${this.projectDetails._id}`);
  }
    async openDialog() {
      let popupDetails= {
        title: "SHAREABLE_FILE",
        actionButtons: [
          { label: "DONT_SYNC", action: false},
          { label: "SYNC_AND_SHARE", action: true }
        ]
      }
      let response = await this.utils.showDialogPopup(popupDetails)

      if(response){
        console.log('you have selected sync and share respectively');
      }else{
        this.toasterService.showToast("FILE_NOT_SHARED","danger")
      }
  }

  async openDialogForDelete(id:any) {
    let popupDetails= {
      title: "CONFIRMATION_DELETE",
      actionButtons: [
        { label: "NO", action: false},
        { label: "YES", action: true }
      ]
    }
    let response = await this.utils.showDialogPopup(popupDetails)

    if(response){
      this.projectDetails.tasks = this.projectDetails.tasks.filter((task:any) => task._id !== id);
      let finalData = {
        key: this.projectDetails._id,
        data:this.projectDetails
      }
      this.db.updateData(finalData)
      this.initializeTasks()
      this.toasterService.showToast("TASK_DELETE_SUCCESS","success")
    }
  }

  setActionsList(){
    let options:any = JSON.parse(JSON.stringify(actions.PROJECT_ACTIONS));
    let optionList:any = actions.ACTION_LIST;
    if(!this.projectDetails.isEdit){
      options[options.length-1] = actions.SYNCED_ACTION
    }
    if(this.submitted){
      options.pop()
    }
    this.projectActions = options;
    this.actionsList = optionList;
  }


  onLearningResources(id:any,fromDetailspage:boolean){
    this.routerService.navigate(`/learning-resource/${id}/${this.projectDetails._id}/${fromDetailspage}`)

  }
  onStartObservation(){
    console.log("start observation");
  }
  initializeTasks(): void {
    if (this.projectDetails.tasks && this.projectDetails.tasks.length >= 0) {
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
