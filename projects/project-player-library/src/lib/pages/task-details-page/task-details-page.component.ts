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
        console.log('You have successfully changed the task name');
      } else {
        console.log(`you have selected no and changes doesn't reflected.`);
      }
    });
  }

  openDatePickerForTask() {}

  deleteSubTask(event: any) {
    const index = this.task.children.findIndex(
      (child: any) => child.name === event.name
    );
    if (index !== -1) {
      this.task.children.splice(index, 1);
      console.log(`Subtask '${event.name}' deleted successfully.`);
      this.updateTaskStatus();
    } else {
      console.log(`Subtask '${event.name}' not found.`);
    }
  }
  updateTaskStatus(event?: any) {
    if(this.task.children.length > 0){
      const allNotStarted = this.task.children.every(
        (child: any) => child.status === 'notStarted'
      );
      const allCompleted = this.task.children.every(
        (child: any) => child.status === 'completed'
      );
      if (allNotStarted) {
        this.task.status = 'notStarted';
      } else if (allCompleted) {
        this.task.status = 'completed';
      } else {
        this.task.status = 'inProgress';
      }
      this.updateDataInDb();
    }
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
    let finalData = {
      key:this.projectDetails._id,
      data:this.projectDetails
    }
    this.db.updateData(finalData);
    this.getProjectDetails();
    this.toasterService.showToast("FILES_CHANGES_UPDATED")
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
          this.toasterService.showToast('ACCEPT_POLICY_ERROR_MSG')
        }
      }
    })
  }
}
