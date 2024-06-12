import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { actions } from '../../constants/actionConstants';
import { DbService } from '../../services/db/db.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { UtilsService } from '../../services/utils/utils.service';
import { statusType } from '../../constants/statusConstants';
import { ProjectService } from '../../services/project/project.service';
import { apiUrls } from '../../constants/urlConstants';
import { ApiService } from '../../services/api/api.service';

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
    private toasterService:ToastService, private utils: UtilsService, private projectService: ProjectService, private apiService: ApiService
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
      this.getProjectTaskStatus()
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
        this.projectService.showSyncSharePopup('task', event.name, this.projectDetails, event._id)
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
        this.projectService.showSyncSharePopup('project', this.projectDetails.title, this.projectDetails)
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

  getProjectTaskStatus(){
    if(!this.projectDetails.tasks && this.projectDetails.tasks.length){
      return
    }
    let taskIdList = this.getAssessmentTypeTaskIds()
    if(!taskIdList.length){
      return
    }
    const config = {
      url: `${apiUrls.PROJECT_TASK_STATUS}/${this.projectDetails._id}`,
      payload: { taskIds: taskIdList }
    }
    this.apiService.post(config).subscribe(response=>{
      if(!response.result){
        return
      }
      this.updateAssessmentStatus(response.result)
    })
    
  }

  getAssessmentTypeTaskIds(){
    const taskIdsList = []
    for(const task of this.projectDetails.tasks){
      task.type == "assessment" || task.type == "observation" ? taskIdsList.push(task._id) : null
    }
    return taskIdsList
  }

  updateAssessmentStatus(assessmentList:any){
    let isChanged = false
    this.projectDetails.tasks.map((taskData:any)=>{
      assessmentList.map((data:any)=>{
        if(data.type == "assessment" || data.type == "observation"){
          if(data._id == taskData._id && data.submissionDetails.status){
            if(!taskData.submissionDetails || JSON.stringify(taskData.submissionDetails) != JSON.stringify(data.submissionDetails)){
              taskData.submissionDetails = data.submissionDetails
              taskData.status = data.submissionDetails.status
              taskData.isEdit = true
              isChanged = true
              this.projectDetails.isEdit = true
              this.countCompletedTasks(this.projectDetails);
              this.calculateProgress();
              this.setActionsList()
            }
          }
        }
      })
    })
    if(isChanged){
      let finalData = {
        key: this.projectDetails._id,
        data:this.projectDetails
      }
      this.db.updateData(finalData)
    }
  }

}
