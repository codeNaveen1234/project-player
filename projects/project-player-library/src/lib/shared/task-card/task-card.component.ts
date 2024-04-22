import { Component, Input, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DailogPopupComponent } from '../dialog-popup/dailog-popup.component';

@Component({
  selector: 'lib-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task: any;
  @Input() submittedImprovement: any;

  constructor(private dialog: MatDialog, private router: Router) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const modelref = this.dialog.open(DailogPopupComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    modelref.componentInstance.dialogBox = {
      title: "CONFIRMATION_DELETE",
      Yes: 'YES',
      No: 'NO',
    };
    modelref.afterClosed().subscribe((res: boolean) => {
      if (res) {
        console.log('The task was deleted.');
      } else {
        console.log('The deletion was canceled.');
      }
    });
  }
  moveToDetailsTask(data: any) {
    console.log(this.submittedImprovement);
    console.log(data);
    if (!this.submittedImprovement) {
      this.router.navigate([`/task-details/${data}`], {
        skipLocationChange: true,
      });
    }
  }
}
