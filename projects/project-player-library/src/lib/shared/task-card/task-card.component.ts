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
      this.routerService.navigate(`/task-details/${data}`);
    }
  }
}
