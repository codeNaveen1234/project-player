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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  tasksList:any = []
  private destroy$ = new Subject<void>();

  constructor(private routerService: RoutingService, private db: DbService, private activatedRoute: ActivatedRoute,
    private toasterService:ToastService, private utils: UtilsService, private projectService: ProjectService, private apiService: ApiService, private router: Router
  ) {
    console.log('Details page console called(PLAYER)')
    // activatedRoute.params.subscribe(param=>{
    //   console.log('Params in player: ',param)
    //   this.getData(param['id'])
    // })
    activatedRoute.queryParams
    .pipe(takeUntil(this.destroy$))
    .subscribe(param => {
      console.log('Params in player: ',param)
      setTimeout(() => {
        this.getData(param['id'])
      }, 0);
      
    });
    // const param = this.activatedRoute.snapshot.params;
    // console.log('Params in player: ',param)
  }

  ngOnInit(): void {
    // const param = this.activatedRoute.snapshot.params;
    console.log('Details page init')
  }

  getData(id:any){
    console.log('Get data called')
    this.db.getData(id).then(data=>{
      this.projectDetails = data.data
      this.submitted = data.data.status == statusType.submitted
      this.tasksList = data.data.tasks
      this.initializeTasks()
      this.getProjectTaskStatus()
      this.countCompletedTasks();
      this.calculateProgress();
      this.setActionsList()
    })
  }
  countCompletedTasks() {
    this.completedCount = 0; // Reset the count each time the method is called

    if (this.tasksList.length > 0) {
      this.tasksList.forEach((task: any) => {
        if (task.status === statusType.completed) {
          this.completedCount++;
        }
      });
    }
  }

  calculateProgress(): void {
    const totalTasks = this.tasksList.length

    if (totalTasks > 0 && this.completedCount > 0) {
      this.progressValue = (this.completedCount / totalTasks) * 100;
    } else {
      this.progressValue = 0; // Ensure progress is zero if no tasks are completed
    }
  }

  submitImprovement() {
    this.routerService.navigate(`/add-files/${this.projectDetails._id}`)
  }

  navigateToNewTask() {
    this.router.navigate([`/project-details/add-task`],{queryParams:{type:"task",projectId:this.projectDetails._id}});
    // this.routerService.navigate(`/add-task/${this.projectDetails._id}`)
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
      // this.routerService.navigate(`/task-details/${taskId}/${this.projectDetails._id}`);
      // this.router.navigate([`/project-details/task-details/${'8d6c4a87-5860-474b-b40a-f8a9b88d5053'}/${'667bd7cf27129a25d33143dc'}`])
      this.router.navigate([`/project-details/`],{queryParams:{type:"task",taskId:taskId,projectId:this.projectDetails._id}});
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
      let taskIndex = this.projectDetails.tasks.findIndex((data:any)=>{
        return data._id == id
      })
      this.projectDetails.tasks[taskIndex].isDeleted = true
      this.projectDetails.tasks[taskIndex].isEdit = true
      this.projectDetails.isEdit = true
      let finalData = {
        key: this.projectDetails._id,
        data:this.projectDetails
      }
      this.db.updateData(finalData)
      this.initializeTasks()
      this.setActionsList()
      this.countCompletedTasks();
      this.calculateProgress();
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
    this.tasksList = this.tasksList.filter((data:any)=>{
      return !data.isDeleted
    })
    if (this.tasksList && this.tasksList.length > 0) {
      this.displayedTasks = this.tasksList.slice(0, 4);
      this.remainingTasks = this.tasksList.slice(4);
    }
  }

  loadMoreTasks(): void {
    if (this.remainingTasks.length > 0) {
      this.displayedTasks.push(...this.remainingTasks);
      this.remainingTasks = [];
    }
  }

  getProjectTaskStatus(){
    if(!this.tasksList && this.tasksList.length){
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
    for(const task of this.tasksList){
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
              this.countCompletedTasks();
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

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
