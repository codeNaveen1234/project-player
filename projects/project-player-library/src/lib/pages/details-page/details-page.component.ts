import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogBoxComponent } from '../../shared/dailog-box/dailog-box.component';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnInit {
  completedcount: number = 0;
  progressValue: number = 0;

  submitted: boolean = false;
  projectDetails = {
    title: 'Project 37',
    description: 'awfrwhrw rwrurwr ',
    categories: [
      {
        label: 'Education Leader',
        value: '5fcfa9a2457d6055e33843f3',
        labelTranslations: '{"en":"Education Leader"}',
        name: 'Education Leader',
      },
    ],
    hasAcceptedTAndC: true,
    tasks: [
      {
        _id: 'd4f7cc15-3451-4651-8327-27368533dbf3',
        // status: 'notStarted',
        status: 'completed',
        name: 'task i',
        endDate: '',
        assignee: '',
        type: 'simple',
        attachments: [],
        startDate: '',
        isNew: true,
        isEdit: true,
        children: [],
        isDeleted: false,
        isDeletable: true,
      },
      {
        _id: 'd4f7cc15-3451-4651-8327-27368533dbf4',
        // status: 'notStarted',
        status: 'completed',
        name: 'task i',
        endDate: '',
        assignee: '',
        type: 'simple',
        attachments: [],
        startDate: '',
        isNew: true,
        isEdit: true,
        children: [],
        isDeleted: false,
        isDeletable: true,
      },
    ],
    isDeleted: false,
    status: 'inProgress',
    learningResources: [],
    lastDownloadedAt: '2023-12-08T13:40:28.437Z',
    updatedAt: '2023-12-08T13:44:46.221Z',
    isEdit: true,
    _id: '65731ccc70331b0008f972b4',
    _rev: '3-c08a24dcf6c1b61628ca69de3fb2c596',
  };

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.countCompletedTasks(this.projectDetails);
    this.calculateProgress();
  }

  countCompletedTasks(projectDetails: any): number {
    if (
      projectDetails &&
      projectDetails.tasks &&
      projectDetails.tasks.length > 0
    ) {
      projectDetails.tasks.forEach((task: any) => {
        if (task.status === 'completed') {
          this.completedcount++;
        }
      });
    }

    return this.completedcount;
  }
  calculateProgress(): void {
    if (this.projectDetails.tasks.length > 0) {
      this.progressValue =
        (this.completedcount / this.projectDetails.tasks.length) * 100;
    }
  }
  submitimprovement() {
    this.submitted = true;
  }

  navigatetonewtask(){}


}
