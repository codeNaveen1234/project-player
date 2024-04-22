import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';

@Component({
  selector: 'lib-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnInit {
  completedCount: number = 0;
  progressValue: number = 0;
  projectActions = [
    {
      label:"DOWNLOAD",
      icon1:"cloud_download",
      emitdata:false
    },
    {
      label:"SHARE",
      icon1:"ios_share",
      emitdata:false
    },
    {
      label:"FILES",
      icon1:"folder_open",
      emitdata:false
    },
    {
      label:"SYNC",
      icon1:"sync",
      emitdata:false
    },
  ]
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
          this.completedCount++;
        }
      });
    }

    return this.completedCount;
  }
  calculateProgress(): void {
    if (this.projectDetails.tasks.length > 0) {
      this.progressValue =
        (this.completedCount / this.projectDetails.tasks.length) * 100;
    }
  }
  submitImprovement() {
    this.submitted = true;
  }

  navigateToNewTask() {}

  iconListAction(event: any) {
    if(event.label === "DOWNLOAD"){
      this.changeIcons("DOWNLOAD","DOWNLOADED","check_circle")
      event.emitdata = true;
    }
    else if(event.label === "SYNC"){
      this.changeIcons("SYNC","SYNCED","sync");
      event.emitdata = true;
    }
    else if(event.label === "FILES"){
      this.moveToFiles();
    }
    else if(event.label === "SHARE"){
      this.openDialog('0','0')
    }
  }
  changeIcons(iconname:string,iconlabel:string,icon:string){
    let item = this.projectActions.find(element => element.label === iconname)
       if(item){
         item.label = iconlabel;
          item.icon1 = icon;
       }
  }
   moveToFiles() {
    this.router.navigate(['/files'], { skipLocationChange: true });
  }
   openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const modelref = this.dialog.open(DailogPopupComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    modelref.componentInstance.dialogBox = {
      title: "SHAREABLE_FILE",
      Yes: "SYNC_AND_SHARE",
      No: "DONT_SYNC",
    };
    modelref.afterClosed().subscribe((res: boolean) => {
      if (res) {
        console.log('you have selected sync and share respectively');
      } else {
        console.log(`you have selected Don't sync.`);
      }
    });
  }
}
