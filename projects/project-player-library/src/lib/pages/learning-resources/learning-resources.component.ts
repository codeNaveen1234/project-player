import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  selector: 'lib-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrls: ['./learning-resources.component.css']
})
export class LearningResourcesComponent implements OnInit {
  taskId: any;
  id: any;
  fromDetailspage!: boolean;
  learningResources: any;

  constructor(private route: ActivatedRoute, private db: DbService, private routerService: RoutingService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.taskId = params.get('taskId');
      this.id = params.get('id');
      this.fromDetailspage = params.get('fromDetailspage') === 'true';
      this.getProjectDetails();
    });
  }

  getProjectDetails() {
    this.db.getData(this.id).then((data) => {
      let projectDetails = data.data;
      this.getTaskLearningResources(projectDetails);
    });
  }

  getTaskLearningResources(data: any) {
    let task = data.tasks.find((task: { _id: any; }) => task._id === this.taskId);
    this.learningResources = task.learningResources;
  }

  goBack() {
    if (!this.fromDetailspage) {
      this.routerService.navigate(`/task-details/${this.taskId}/${this.id}`);
    } else {
      this.routerService.navigate(`/details/${this.id}`);
    }
  }

  openResource(data: any) {
    window.open(data.link, '_blank');
  }
}
