import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { statusLabels, statusType } from '../../constants/statusConstants';
import { actions } from '../../constants/actionConstants';

@Component({
  selector: 'lib-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task: any;
  @Input() isPreview: any;
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() projectDetails:any;
  statusLabels:any = statusLabels
  statusTypes:any = statusType
  actionsList: any = JSON.parse(JSON.stringify(actions.ACTION_LIST))

  constructor(private routerService: RoutingService) {}

  ngOnInit(){
    this.isPreview = this.projectDetails.status == statusType.submitted
    if(this.isPreview){
      this.actionsList = []
    }
    if(!this.task.isDeletable){
      this.actionsList.pop()
    }
  }

  actionsEmit(item:any){
    const data = { action: item.action, ...this.task };
    this.newItemEvent.emit(data);
  }

  moveToDetailsTask(data: any) {
    if (!this.isPreview) {
      this.routerService.navigate(`/project-details`,{type:'taskDetails', taskId: data, projectId: this.projectDetails._id});
    }
  }

}
