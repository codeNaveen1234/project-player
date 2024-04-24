import { Component, EventEmitter, Input, Output, input } from '@angular/core';
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
  @Input() actionsList:any;
  @Output() newItemEvent = new EventEmitter<any>();


  constructor(private dialog: MatDialog, private router: Router) {}

  actionsEmit(item:any,id:any){
    if(item.action === "edit"){
      item.action = "edited"
    }
    else if(item.action === "share"){
      item.action = "shared"
    }
    else {
      item.action = "deleted"
    }
    const data = { item: item, id: id };
    this.newItemEvent.emit(data);
  }

  moveToDetailsTask(data: any) {
    if (!this.submittedImprovement) {
      this.router.navigate([`/task-details/${data}`], {
        skipLocationChange: true,
      });
    }
  }
}
