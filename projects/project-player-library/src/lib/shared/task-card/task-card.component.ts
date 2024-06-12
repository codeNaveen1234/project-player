import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { statusLabels, statusType } from '../../constants/statusConstants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmStartImprovementComponent } from '../confirm-start-improvement/confirm-start-improvement.component';

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
  @Input() startImprovement?:any;
  @Input() projectId?:any;
  @Output() startImprovementEvent = new EventEmitter<any>();


  statusLabels:any = statusLabels
  statusTypes:any = statusType


  constructor(private routerService: RoutingService,private dialog: MatDialog) {}

  actionsEmit(item:any){
    const data = { action: item.action, ...this.task };
    this.newItemEvent.emit(data);
  }

  moveToDetailsTask(data: any) {
    if (!this.submittedImprovement && !this.startImprovement) {
      this.routerService.navigate(`/task-details/${data}/${this.projectId}`);
    }
    else if(!this.submittedImprovement && this.startImprovement){
      this.showConfirmJoinProgram()
    }
  }
  showConfirmJoinProgram() {
    const dialogRef = this.dialog.open(StartImprovementPopupComponent, {
      width: '400px',
      minHeight: '150px',
    });

    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.actionsEmitForStartImprovement(data)
      }
    })
  }

  actionsEmitForStartImprovement(data:any){
    this.startImprovementEvent.emit(data);
  }

}
