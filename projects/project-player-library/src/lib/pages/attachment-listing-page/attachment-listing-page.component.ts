import { Component } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'lib-attachment-listing-page',
  templateUrl: './attachment-listing-page.component.html',
  styleUrl: './attachment-listing-page.component.css'
})
export class AttachmentListingPageComponent {
  projectData:any ;
  isImages:any;
  isVideos:any;
  isFiles:any;
  isLinks:any;
  attachments:any;
  constructor(private routerService:RoutingService,private db:DbService,private activatedRoute:ActivatedRoute,private toasterService:ToastService,
    private utils: UtilsService
  ){
    activatedRoute.params.subscribe(param=>{
      this.getData(param['id'])
    })
  }

  getData(id:any){
    this.db.getData(id).then(data=>{
      this.projectData = data.data;
      this.getAttachments(this.projectData);
    })
  }

  hasAttachments(attachmentType: string): { project: boolean, task: boolean } {
    let result = { project: false, task: false };
    if(attachmentType === 'image'){
      if ( this.attachments.project || this.attachments.tasks ) {
          result.project = this.attachments.project.attachments && this.attachments.project.attachments.some((attachment: any) => attachment.type.includes(attachmentType)) || this.attachments.project.remarks;
          result.task = this.attachments.tasks.some((task: any) => task.attachments && task.attachments.some((attachment: any) => attachment.type.includes(attachmentType))) || this.attachments.tasks.some((task:any)=>task.remarks);
      }
      return result;
    }
    else{
      if ( this.attachments.project || (this.attachments.tasks && Array.isArray(this.attachments.tasks) && this.attachments.tasks.length > 0)) {
        result.project = this.attachments.project.attachments && this.attachments.project.attachments.some((attachment: any) => attachment.type.includes(attachmentType));
        result.task = this.attachments.tasks.some((task: any) => task.attachments && task.attachments.some((attachment: any) => attachment.type.includes(attachmentType)));
    }
    return result;
    }
}

  getAttachments(data:any){
    this.attachments = {
      project: {},
      tasks: []
    };
    if(data?.attachments?.length){
      let projectEvidence = {
        title: data.title,
        remarks: data.remarks ? data.remarks : '',
        attachments: []
      }
      this.getEvendencies(data.attachments,projectEvidence);
      this.attachments.project = projectEvidence;
    }
    if(data?.tasks) {
      data.tasks.forEach((task: { isDeleted: any; name: any; remarks: any; attachments: string | any[]; })=>{
        if(!task.isDeleted){
          let taskEvidence = {
            title: task.name,
            remarks: task.remarks ? task.remarks : '',
            attachments: []
          }
          if(task.attachments && task.attachments.length || task.remarks){
            this.getEvendencies(task.attachments,taskEvidence)
            this.attachments.tasks.push(taskEvidence);
          }
        }
      })
    }
    this.isVideos = this.hasAttachments('video');
    this.isFiles = this.hasAttachments('application');
    this.isLinks = this.hasAttachments('link');
    this.isImages = this.hasAttachments('image');
  }
  getEvendencies(attachments:any,evidence:any){
    attachments.forEach((attachment: any) => {
      evidence.attachments.push(attachment);
    })
  }


  getRemoveAttachment(event:any){
    this.removeAttachment(event.name);
  }

  async removeAttachment(data:any) {
      let popupDetails= {
        title: "CONFIRMATION_DELETE",
        actionButtons: [
          { label: "YES", action: true },
          { label: "NO", action: false}
        ]
      }
      let response = await this.utils.showDialogPopup(popupDetails)
      if(response){
        this.deleteAttachment(data);
      }
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
      this.projectData.isEdit = true
        let finalData = {
          key: this.projectData._id,
          data: this.projectData
        }
        this.db.updateData(finalData);
        this.db.deleteData(data);
        this.toasterService.showToast("ATTACHMENT_REMOVED_SUCCESS","success")
        this.getData(this.projectData._id);
  }
  moveToHomePage(){
    this.routerService.navigate(`/details/${this.projectData._id}`);
  }
  isFirstAttachment(attachments: any[], itemIndex: number, attachmentType: string): boolean {
    const firstAttachmentIndex = attachments.findIndex(a => a.type.includes(attachmentType));
    return itemIndex === firstAttachmentIndex;
}

hasRemarks(task: any): boolean {
    return task.remarks && task.remarks.trim() !== '';
}

trackByTaskIndex(index: number, task: any): any {
    return task.id; // Use a unique identifier for the task
}

trackByItemIndex(index: number, item: any): any {
    return item.id; // Use a unique identifier for the item
}

}
