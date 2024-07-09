import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditTaskCardComponent } from '../../shared/edit-task-card/edit-task-card.component';
import { actions } from '../../constants/actionConstants';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';
import { UtilsService } from '../../services/utils/utils.service';
import { PrivacyPolicyPopupComponent } from '../../shared/privacy-policy-popup/privacy-policy-popup.component';
import { ToastService } from '../../services/toast/toast.service';
import { statusType } from '../../constants/statusConstants';

interface TaskOption {
  value: any;
  label: string;
}
@Component({
  selector: 'lib-taskdetails-page',
  templateUrl: './task-details-page.component.html',
  styleUrl: './task-details-page.component.css',
})
export class TaskDetailsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private routingService: RoutingService,
    private db: DbService,private utils: UtilsService,private toasterService:ToastService) {}
  taskId: any;
  selectedValue!: string;
  textFormControl = new FormControl('');
  task: any = {};
  taskOptions : TaskOption[] =[];
  projectId: any
  projectDetails:any
  subTaskData:any;
  currentYear:any=new Date().getFullYear();
  minDate:any=new Date(this.currentYear-2,0,1);
  maxDate:any=new Date(this.currentYear+5,11,31);

  ngOnInit(): void {
    this.setOptionList();
    this.route.paramMap.subscribe((params: any) => {
      this.taskId = params.get('taskId')
      this.projectId = params.get('id')
    });
    this.getProjectDetails()
  }

  getProjectDetails(){
    this.db.getData(this.projectId).then(data=>{
      this.projectDetails = data.data
      this.getTaskDetails();
    })
  }

  getTaskDetails() {
    this.task = this.projectDetails.tasks.find(
      (task:any) => task._id === this.taskId
    );
  }
  addSubTask(data: any) {
    this.subTaskData = this.utils.getMetaData();
    this.subTaskData.name = data,
    delete this.subTaskData.children;
    this.task.children.push(this.subTaskData);
    this.updateTaskStatus();
    this.textFormControl.reset();
  }
  editTask() {
    if(this.task.isDeletable){
      this.openEditTaskName(this.task.name,"EDIT_TASK");
    }
  }
  openEditTaskName(
    taskName: string,
    editType:string
  ): void {
    const modelref = this.dialog.open(EditTaskCardComponent, {
      width: '400px'
    });
    modelref.componentInstance.title = taskName;
    modelref.componentInstance.editType=editType;
    modelref.componentInstance.editName.subscribe((res) => {
      this.task.name = res;
    });
    modelref.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.updateDataInDb()
      }
    });
  }

  openDatePickerForTask() {}

  deleteSubTask(event: any) {
    const index = this.task.children.findIndex(
      (child: any) => child._id === event._id
    );
    if (index !== -1) {
      this.task.children.splice(index, 1);
      this.updateTaskStatus();
    }
  }
  updateTaskStatus(event?: any) {
      const allNotStarted = this.task.children.every(
        (child: any) => child.status === statusType.notStarted
      );
      const allCompleted = this.task.children.every(
        (child: any) => child.status === statusType.completed
      );
      if (allNotStarted) {
        this.task.status = statusType.notStarted;
      } else if (allCompleted) {
        this.task.status = statusType.completed;
      } else {
        this.task.status = statusType.inProgress;
      }
      this.updateDataInDb();
  }
  setOptionList(){
    let options:any = actions.TASK_STATUS;
    this.taskOptions = options;
  }

  goBack(){
    this.routingService.navigate(`/details/${this.projectDetails._id}`)
  }

  taskStatusChange(){
    setTimeout(()=>{
      this.updateDataInDb()
    },0)
  }

  updateDataInDb(){
    this.task.isEdit = true
    this.projectDetails.isEdit = true
    let finalData = {
      key:this.projectDetails._id,
      data:this.projectDetails
    }
    this.db.updateData(finalData);
    this.getProjectDetails();
    this.toasterService.showToast("FILES_CHANGES_UPDATED","success")
  }

  addFiles(){
    const dialogRef = this.dialog.open(PrivacyPolicyPopupComponent,{
      width:'400px',
      minHeight:'150px'
    })

    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        if(data.isChecked && data.upload){
          this.routingService.navigate(`/add-files/${this.projectDetails._id}`,{taskId:this.taskId})
        }else{
          this.toasterService.showToast('ACCEPT_POLICY_ERROR_MSG',"danger")
        }
      }
    })
  }

  onDateChange(newDate: Date) {
    let localDateString = this.formatDateToLocal(newDate);
    this.task.endDate = localDateString;
    this.updateDataInDb();
  }

  formatDateToLocal(date: Date): string {
    let offset = date.getTimezoneOffset() * 60000;
    let localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, -1);
    return localISOTime;
  }

  onLearningResources(id:any,fromDetailspage:boolean){
    this.routingService.navigate(`/learning-resource/${id}/${this.projectDetails._id}/${fromDetailspage}`)
  }
}
