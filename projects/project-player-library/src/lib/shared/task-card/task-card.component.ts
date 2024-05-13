import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';

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


  constructor(private routerService: RoutingService) {}

  actionsEmit(item:any,id:any){
    const data = { action: item.action, id: id };
    this.newItemEvent.emit(data);
  }

  moveToDetailsTask(data: any) {
    if (!this.submittedImprovement) {
      this.routerService.navigate(`/task-details/${data}`);
    }
  }
}
