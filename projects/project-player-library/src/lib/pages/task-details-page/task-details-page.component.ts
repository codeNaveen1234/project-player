import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';
import { EditTaskCardComponent } from '../../shared/edit-task-card/edit-task-card.component';
import { projectDetailsData } from '../../project-details.component.spec.data';

@Component({
  selector: 'lib-taskdetails-page',
  templateUrl: './task-details-page.component.html',
  styleUrl: './task-details-page.component.css',
})
export class TaskDetailsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}
  taskId: any;
  selectedValue!: string;
  textFormControl = new FormControl('');
  task: any = {};
  taskOptions = [
    {
      viewValue: 'Not Started',
      value: 'NOTstarted',
    },
    {
      viewValue: 'In Progress',
      value: 'inProgress',
    },
    {
      viewValue: 'Completed',
      value: 'completed',
    },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      const id = params.get('id');
      console.log(id);
      this.taskId = id;
    });
    this.getTaskDetails();
  }
  getTaskDetails() {
    this.task = projectDetailsData.tasks.find(
      (task) => task._id === this.taskId
    );
  }
  addSubTask(data: any) {
    console.log(data);
    this.task.children.push({ name: data, status: 'NOTstarted' });
    this.updateTaskStatus();
    this.textFormControl.reset();
  }
  editTask() {
    this.openEditTaskName('0', '0', this.task.name,"EDIT_TASK"
    );
  }
  openEditTaskName(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    taskName: string,
    editType:string
  ): void {
    const modelref = this.dialog.open(EditTaskCardComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    modelref.componentInstance.title = taskName;
    modelref.componentInstance.editType=editType;
    modelref.componentInstance.editname.subscribe((res) => {
      this.task.name = res;
    });
    modelref.afterClosed().subscribe((res: boolean) => {
      if (res) {
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
        (child: any) => child.status === 'NOTstarted'
      );
      const allCompleted = this.task.children.every(
        (child: any) => child.status === 'completed'
      );
      if (allNotStarted) {
        this.task.status = 'NOTstarted';
      } else if (allCompleted) {
        this.task.status = 'completed';
      } else {
        this.task.status = 'inProgress';
      }
    }
  }
}
