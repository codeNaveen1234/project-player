import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { statusLabels } from '../../constants/statusConstants';

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
  statusLabels:any = statusLabels


  constructor(private routerService: RoutingService) {}

  actionsEmit(item:any){
    const data = { action: item.action, ...this.task };
    this.newItemEvent.emit(data);
  }

  moveToDetailsTask(data: any) {
    if (!this.submittedImprovement && !this.startImprovement && (this.task.type !== 'observation')) {
      this.routerService.navigate(`/task-details/${data}/${this.projectId}`);
    }
  }
}
