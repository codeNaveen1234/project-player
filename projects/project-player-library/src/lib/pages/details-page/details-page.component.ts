import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';
import { projectDetailsData } from './project-details.component.spec.data';

@Component({
  selector: 'lib-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnInit {
  completedCount: number = 0;
  progressValue: number = 0;
  actionsList=[
    {
      name: "EDIT",
      icon:"edit",
      action:"edit"
    },
    {
      name: "SHARE",
      icon:"ios_share",
      action:"share"
    },
    {
      name: "DELETE",
      icon:"delete",
      action:"delete"
    },
  ];

  projectActions = [
    {
      label:"DOWNLOAD",
      icon:"cloud_download",
      action:"download"
    },
    {
      label:"SHARE",
      icon:"ios_share",
      action:"share"
    },
    {
      label:"FILES",
      icon:"folder_open",
      action:"file"
    },
    {
      label:"SYNC",
      icon:"sync",
      action:"sync"
    },
  ]
  submitted: boolean = false;
  projectDetails = projectDetailsData;
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

  taskCardAction(event:any){
    if(event.item.action == "edited"){
      this.moveToTaskDetails(event.id);
    }
    else if(event.item.action == "deleted"){
     this.openDialogForDelete('0','0',event.id);
    }
    else {
      console.log("shared");
    }
  }

  moveToTaskDetails(data: any) {
    if (!this.submitted) {
      this.router.navigate([`/task-details/${data}`], {
        skipLocationChange: true,
      });
    }
  }

  iconListAction(event: any) {
    console.log(event);
    if(event.action === "download"){
      this.changeIcons("DOWNLOAD","DOWNLOADED","check_circle")
    }
    else if(event.action === "sync"){
      this.changeIcons("SYNC","SYNCED","sync");
    }
    else if(event.action === "file"){
      this.moveToFiles();
    }
    else if(event.action === "share"){
      this.openDialog('0','0')
    }
  }
  changeIcons(iconname:string,iconlabel:string,icon:string){
    let item = this.projectActions.find(element => element.label === iconname)
       if(item){
         item.label = iconlabel;
          item.icon = icon;
          item.action = item.action + 'ed';
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

  openDialogForDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id:any
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
        this.projectDetails.tasks = this.projectDetails.tasks.filter(task => task._id !== id);
      } else {
        console.log('The deletion was canceled.');
      }
    });
  }
}
