import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';
import { projectDetailsData } from './project-details.component.spec.data';
import { RoutingService } from '../../services/routing/routing.service';
import { actions } from '../../constants/actionConstants';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'lib-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnInit {
  completedCount: number = 0;
  progressValue: number = 0;
  showAllTasks: boolean = false;
  actionsList=[
    {
      name:"EDIT",
      icon:"edit",
      action:"edit"
    },
    {
      name:"SHARE",
      icon:"ios_share",
      action:"share"
    },
    {
      name:"DELETE",
      icon:"delete",
      action:"delete"
    },
  ];

  projectActions = []
  submitted: boolean = false;
  projectDetails:any = projectDetailsData;
  constructor(private dialog: MatDialog, private routerService: RoutingService,private toasterservice:ToastService) {}

  ngOnInit(): void {
    this.countCompletedTasks(this.projectDetails);
    this.calculateProgress();
    this.setActionsList()
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
    else if (event.item.action == "deleted"){
      this.openDialogForDelete('0','0',event.id);
    }
    else {
      console.log("shared");
    }
  }

  moveToTaskDetails(data: any) {
    if (!this.submitted) {
      this.routerService.navigate(`/task-details/${data}`)
    }
  }

  iconListAction(event: any) {
    switch (event.action) {
      case "download":
        this.projectDetails.downloaded = true
        this.setActionsList()
        this.toasterservice.showToast("success",2000,"top","right")
        break;

      case "share":
        this.openDialog('0','0')
        break;

      case "files":
        this.moveToFiles()
        break;

      case "sync":
        this.projectDetails.isEdit = false
        this.setActionsList()
        break;

      default:
        break;
    }
  }

    moveToFiles() {
    this.routerService.navigate('/files');
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
        this.projectDetails.tasks = this.projectDetails.tasks.filter((task:any) => task._id !== id);
      } else {
        console.log('The deletion was canceled.');
      }
    });
  }

  setActionsList(){
    let options:any = actions.PROJECT_ACTIONS
    if(this.projectDetails.downloaded){
      options[0] = actions.DOWNLOADED_ACTION
    }
    if(!this.projectDetails.isEdit){
      options[options.length-1] = actions.SYNCED_ACTION
    }
    this.projectActions = options
  }

}
