import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';
import { projectDetailsData } from '../details-page/project-details.component.spec.data';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  selector: 'lib-attachment-listing-page',
  templateUrl: './attachment-listing-page.component.html',
  styleUrl: './attachment-listing-page.component.css'
})
export class AttachmentListingPageComponent {
  constructor(private dialog: MatDialog,private routerService:RoutingService){}
  projectData:any = projectDetailsData;
  isImages:any;
  isVideos:any;
  isFiles:any;
  isLinks:any;
  attachments:any;
  ngOnInit(): void {
    this.getAttachments(this.projectData);
  }
  hasAttachments(attachmentType: string): { project: boolean, task: boolean } {
    let result = { project: false, task: false };

    if (this.attachments.project || (this.attachments.tasks && Array.isArray(this.attachments.tasks) && this.attachments.tasks.length > 0)) {
        result.project = this.attachments.project.attachments && this.attachments.project.attachments.some((attachment: any) => attachment.type === attachmentType);
        result.task = this.attachments.tasks.some((task: any) => task.attachments && task.attachments.some((attachment: any) => attachment.type === attachmentType));
    }

    return result;
}

  getAttachments(data:any){
    this.attachments = {
      project: {},
      tasks: []
    };
    if(data.attachments.length){
      let projectEvidence = {
        title: data.title,
        remarks: data.remarks ? data.remarks : '',
        attachments: []
      }
      this.getEvendencies(data.attachments,projectEvidence);
      this.attachments.project = projectEvidence;
    }
    if(data.tasks) {
      data.tasks.forEach((task: { isDeleted: any; name: any; remarks: any; attachments: string | any[]; })=>{
        if(!task.isDeleted){
          let taskEvidence = {
            title: task.name,
            remarks: task.remarks ? task.remarks : '',
            attachments: []
          }
          if(task.attachments && task.attachments.length){
            this.getEvendencies(task.attachments,taskEvidence)
            this.attachments.tasks.push(taskEvidence);
          }
        }
      })
    }
    this.isVideos = this.hasAttachments('video/mp4');
    this.isFiles = this.hasAttachments('application/pdf');
    this.isLinks = this.hasAttachments('link');
    this.isImages = this.hasAttachments('image/jpeg');
  }
  getEvendencies(attachments:any,evidence:any){
    attachments.forEach((attachment: any) => {
      evidence.attachments.push(attachment);
    })
  }


  getRemoveAttachment(event:any){
    this.removeAttachment("0ms","0ms",event.name);
  }

  removeAttachment(enterAnimationDuration: string,
    exitAnimationDuration: string, data:any): void {
      const modelref = this.dialog.open(DailogPopupComponent, {
        width: "400px",
        enterAnimationDuration,
        exitAnimationDuration,
      });
      modelref.componentInstance.dialogBox = {
        title: "DELETE_ATTACHMENT",
        Yes: "YES",
        No: "NO",
      };
      modelref.afterClosed().subscribe((res: boolean) => {
        if (res) {
          this.deleteAttachment(data);
          console.log("you have successfully deleted the attachment");
        } else {
          console.log(`you have selected cancel`);
        }
      });
    }
    deleteAttachment(data: any): void {
      if (this.projectData.attachments) {
          this.projectData.attachments.forEach((attachment: any, index: number) => {
              if (attachment.name === data) {
                  this.projectData.attachments.splice(index, 1);
                  return;
              }
          });
      }
      this.projectData.tasks.forEach((task: any) => {
          if (task.attachments) {
              task.attachments.forEach((attachment: any, index: number) => {
                  if (attachment.name === data) {
                      task.attachments.splice(index, 1);
                      return;
                  }
              });
          }
      });
      this.getAttachments(this.projectData);
  }
  moveToHomePage(){
    this.routerService.navigate('/details');
  }
}
