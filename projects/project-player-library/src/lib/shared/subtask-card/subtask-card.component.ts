import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogPopupComponent } from '../dialog-popup/dailog-popup.component';
import { EditTaskCardComponent } from '../edit-task-card/edit-task-card.component';
import { actions } from '../../constants/actionConstants';
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
@Output() deleteSubTaskEvent = new EventEmitter<string>();
@Output()  updateSubTaskStatusEvent = new EventEmitter<any>();
subTaskOptions:TaskOption[] = [];
ngOnInit(): void {
  this.setOptionList();
}
constructor(private dialog:MatDialog){}
openDatePickerForSubTask(){
}
openDialog(
  enterAnimationDuration: string,
  exitAnimationDuration: string
): void {
  const modelref = this.dialog.open(DailogPopupComponent, {
    width: '400px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
  modelref.componentInstance.dialogBox = {
    title: 'DELETE_SUB_TASK',
    Yes: `YES`,
    No: `NO`,
  };
  modelref.afterClosed().subscribe((res: boolean) => {
    if (res) {
      this.deleteSubTask(this.subTask);
    } else {
      console.log(`subtask was not deleted`);
    }
  });
}
deleteSubTask(item:any){
this.deleteSubTaskEvent.emit(item);
}
editSubTask(){
this.openEditSubTaskName('0','0',this.subTask.name,"EDIT_SUBTASK");
}
openEditSubTaskName(
  enterAnimationDuration: string,
  exitAnimationDuration: string,
  subTaskName:string,
  editType:string
): void {
  const modelref = this.dialog.open(EditTaskCardComponent, {
    width: '400px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
  modelref.componentInstance.title = subTaskName;
  modelref.componentInstance.editType=editType;
  modelref.componentInstance.editName.subscribe((res)=>{
    this.subTask.name = res;
  })
  modelref.afterClosed().subscribe((res: boolean) => {
    if (res) {
      console.log('You have successfully changed the sub task name');
    } else {
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
}
