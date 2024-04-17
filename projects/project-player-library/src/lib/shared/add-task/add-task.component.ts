import { Component, Input, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogBoxComponent } from '../dailog-box/dailog-box.component';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-add-task',
  // standalone: true,
  // imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Input() task: any;
  @Input() submittedimprovement: any;

  constructor(private dialog: MatDialog, private router: Router) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const modelref = this.dialog.open(DailogBoxComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    modelref.componentInstance.dialogbox ={
      title:'Are you sure you want to delete the task?',
      Yes:'Yes',
      No:'No'
    }
    modelref.afterClosed().subscribe((res: boolean) => {
      if (res) {
        console.log('The task was deleted.');
      } else {
        console.log('The deletion was canceled.');
      }
    });
  }
  movetodetailstask(data: any) {
    console.log(this.submittedimprovement);
    console.log(data);
    if (!this.submittedimprovement) {
      this.router.navigate([`/taskdetail/${data}`], {
        skipLocationChange: true,
      });
    }
  }
}
