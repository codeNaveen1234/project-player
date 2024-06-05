import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskCardComponent } from '../edit-task-card/edit-task-card.component';
import { actions } from '../../constants/actionConstants';
import { DbService } from '../../services/db/db.service';
import { ToastService } from '../../services/toast/toast.service';
import { UtilsService } from '../../services/utils/utils.service';
interface TaskOption {
  value: any;
  label: string;
}
@Component({
  selector: 'lib-subtask-card',
  templateUrl: './subtask-card.component.html',
  styleUrl: './subtask-card.component.css'
})
export class SubtaskCardComponent {
@Input() subTask: any;
@Input() projectDetails: any
@Output() deleteSubTaskEvent = new EventEmitter<string>();
@Output()  updateSubTaskStatusEvent = new EventEmitter<any>();
subTaskOptions:TaskOption[] = [];
ngOnInit(): void {
  this.setOptionList();
}
constructor(private dialog:MatDialog, private utils: UtilsService,private db: DbService,private toasterService:ToastService){}

async openDialog() {
  let popupDetails= {
    title: "DELETE_SUB_TASK",
    actionButtons: [
      { label: "NO", action: false},
      { label: "YES", action: true }
    ]
  }
  let response = await this.utils.showDialogPopup(popupDetails)

  if(response){
    this.deleteSubTask(this.subTask);
  }
}
deleteSubTask(item:any){
this.deleteSubTaskEvent.emit(item);
}
editSubTask(){
  if(this.subTask.isDeletable){
    this.openEditSubTaskName(this.subTask.name,"EDIT_SUBTASK");
  }
}
openEditSubTaskName(
  subTaskName:string,
  editType:string
): void {
  const modelref = this.dialog.open(EditTaskCardComponent, {
    width: '400px'
  });
  modelref.componentInstance.title = subTaskName;
  modelref.componentInstance.editType=editType;
  modelref.componentInstance.editName.subscribe((res)=>{
    this.subTask.name = res;
  })
  modelref.afterClosed().subscribe((res: boolean) => {
    if (res) {
      console.log('You have successfully changed the sub task name');
      this.updateDataInDb();
    } else {
      this.toasterService.showToast("FILES_CHANGES_NOT_UPDATED","danger")
      console.log(`you have selected no and changes doesn't reflected.`);
    }
  });
}
updateSubTaskStatus(data:any){
  this.updateSubTaskStatusEvent.emit(data);
}
setOptionList(){
  let options:any = actions.TASK_STATUS;
  this.subTaskOptions = options;
}
onDateChange(newDate: Date) {
  let localDateString = this.formatDateToLocal(newDate);
  this.subTask.endDate = localDateString;
  this.updateDataInDb();
}

formatDateToLocal(date: Date): string {
  let offset = date.getTimezoneOffset() * 60000;
  let localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, -1);
  return localISOTime;
}

updateDataInDb(){
  let finalData = {
    key:this.projectDetails._id,
    data:this.projectDetails
  }
  this.db.updateData(finalData);
  this.toasterService.showToast("FILES_CHANGES_UPDATED","success")
}
}
