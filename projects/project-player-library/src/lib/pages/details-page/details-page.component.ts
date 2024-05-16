import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';
import { RoutingService } from '../../services/routing/routing.service';
import { actions } from '../../constants/actionConstants';
import { DbService } from '../../services/db/db.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'lib-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnInit {
  completedCount: number = 0;
  progressValue: number = 0;
  actionsList = [];
  projectActions = []
  submitted: boolean = false;
  projectDetails:any;
  constructor(private dialog: MatDialog, private routerService: RoutingService, private db: DbService, private activatedRoute: ActivatedRoute,
    private toasterService:ToastService
  ) {
    activatedRoute.params.subscribe(param=>{
      this.getData(param['id'])
    })
  }

  ngOnInit(): void {
  }

  getData(id:any){
    this.db.getData(id).then(data=>{
      this.projectDetails = data.data
      this.countCompletedTasks(this.projectDetails);
      this.calculateProgress();
      this.setActionsList()
    })
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
    this.toasterService.showToast("PROJECT_SUBMMITTED_SUCCESS")
  }

  navigateToNewTask() {
    this.routerService.navigate('/add-task',this.projectDetails._id)
  }

  taskCardAction(event:any){
    switch (event.action) {
      case 'edit':
        this.moveToTaskDetails(event.id);
        break;

      case 'share':
        this.openDialog()
        break;

      case 'delete':
        this.openDialogForDelete(event.id);
        break;

      default:
        break;
    }
  }

  moveToTaskDetails(data: any) {
    if (!this.submitted) {
      this.routerService.navigate(`/task-details/${data}`,this.projectDetails._id)
    }
  }

  iconListAction(event: any) {
    switch (event.action) {
      case "download":
        this.projectDetails.downloaded = true
        this.setActionsList()
        this.toasterService.showToast("PROJECT_DOWNLOADING_SUCCESS")
        break;

      case "share":
        this.openDialog()
        break;

      case "files":
        this.moveToFiles()
        break;

      case "sync":
        this.projectDetails.isEdit = false
        this.toasterService.showToast("PROJECT_SYNC_SUCCESS")
        this.setActionsList()
        break;

      default:
        break;
    }
  }

    moveToFiles() {
    this.routerService.navigate('/files',this.projectDetails._id);
  }
    openDialog(): void {
    const modelref = this.dialog.open(DailogPopupComponent, {
      width: '400px',
    });
    modelref.componentInstance.dialogBox = {
      title: "SHAREABLE_FILE",
      Yes: "SYNC_AND_SHARE",
      No: "DONT_SYNC",
    };
    modelref.afterClosed().subscribe((res: boolean) => {
      if (res) {
        console.log('you have selected sync and share respectively');
        this.toasterService.showToast("PROJECT_SYNC_SUCCESS")
      } else {
        console.log(`you have selected Don't sync.`);
      }
    });
  }

  openDialogForDelete(id:any): void {
    const modelref = this.dialog.open(DailogPopupComponent, {
      width: '300px'
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
        let finalData = {
          key: this.projectDetails._id,
          data:this.projectDetails
        }
        this.db.updateData(finalData)
        this.toasterService.showToast("ASK_DELETE_SUCCESS")
      } else {
        console.log('The deletion was canceled.');
      }
    });
  }

  setActionsList(){
    let options:any = actions.PROJECT_ACTIONS;
    let optionList:any = actions.ACTION_LIST;
    if(this.projectDetails.downloaded){
      options[0] = actions.DOWNLOADED_ACTION
    }
    if(!this.projectDetails.isEdit){
      options[options.length-1] = actions.SYNCED_ACTION
    }
    this.projectActions = options;
    this.actionsList = optionList;
  }

  moveToDetailsTask(data: any) {
    if (!this.submitted) {
      this.routerService.navigate(`/task-details/${data}`,this.projectDetails._id);
    }
  }

  onLearningResources(){
    console.log("learning reources");
  }
  onStartObservation(){
    console.log("start observation");
  }
}
