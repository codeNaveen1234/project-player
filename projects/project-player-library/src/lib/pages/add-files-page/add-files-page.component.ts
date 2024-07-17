import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLinkPopupComponent } from '../../shared/add-link-popup/add-link-popup.component';
import { actions } from '../../constants/actionConstants';
import { ToastService } from '../../services/toast/toast.service';
import { AttachmentService } from '../../services/attachment/attachment.service';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { RoutingService } from '../../services/routing/routing.service';
import { PrivacyPolicyPopupComponent } from '../../shared/privacy-policy-popup/privacy-policy-popup.component';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'lib-add-files-page',
  templateUrl: './add-files-page.component.html',
  styleUrls: ['./add-files-page.component.css']
})
export class AddFilesPageComponent {
  @ViewChild('file') file! : ElementRef
  uploadOptions = actions.FILE_UPLOAD_OPTIONS
  attachments:any = []
  remarks = ''
  acceptType = ''
  projectId = ''
  taskId = ''
  projectDetails:any
  taskDetails:any
  pageDescription:any
  buttonLabel:any
  taskIndex:any
  title:any
  updateDelay: any;

  constructor(private dialog: MatDialog, private toastService: ToastService, private attachmentService: AttachmentService,
    private activatedRoute: ActivatedRoute, private db: DbService, private routingService: RoutingService, private utils: UtilsService) {
      activatedRoute.params.subscribe(param=>{
        this.projectId = param['id']
      })
      activatedRoute.queryParams.subscribe(queryParam=>{
        this.taskId = queryParam['taskId']
      })
    }

  ngOnInit(){
    this.getProjectDetails()
  }

  async getProjectDetails(){
    await this.db.getData(this.projectId).then(data=>{
      this.projectDetails = data.data
    })
    if(this.taskId){
      this.pageDescription = "TASK_FILES_DESCRIPTION"
      this.buttonLabel = "ATTACH_FILES"
      this.getTaskDetails()
    }else{
      this.pageDescription = "PROJECT_FILES_DESCRIPTION"
      this.buttonLabel = "SUBMIT_IMPROVEMENT"
      this.title = this.projectDetails.title
      this.attachments = this.projectDetails.attachments ? this.projectDetails.attachments : []
    }
    this.remarks = this.taskId ? this.taskDetails.remarks : this.projectDetails.remarks
  }

  getTaskDetails(){
    this.taskIndex = this.projectDetails.tasks.findIndex((data:any)=>{
      return data._id == this.taskId
    })
    this.taskDetails = this.projectDetails.tasks[this.taskIndex]
    this.title = this.taskDetails.name
    this.attachments = this.taskDetails.attachments ? this.taskDetails.attachments : []
  }

  upload(option:any){
    this.acceptType = option.accept
    if(this.taskId){
      this.uploadFiles(option)
    }else{
      this.showPrivacyPolicyPopup(option)
    }
  }

  uploadFiles(option:any){
    if(option.accept == 'link'){
      this.openLinkModal()
    }else{
      setTimeout(() => {
        this.file.nativeElement.value = '';
        this.file.nativeElement.click()
      }, 0);
    }
  }

  onChange($event: any) {
    clearTimeout(this.updateDelay);
    this.updateDelay = setTimeout(() => {
      this.saveDataToLocalDb()
    }, 1000);
  }

  async onFileSelect(event:any){
    let value = event.target.files[0]
    if(this.attachmentService.isFileSizeGreater(value)){
      return
    }
    let fileName = this.attachmentService.generateFileName(value)
    let convertedFile = await this.attachmentService.convertTobase64(value)
    let dataToAdd = {
      key: fileName,
      data: convertedFile
    }
    this.db.addData(dataToAdd)
    let data = {
      name : fileName,
      type : value.type,
      isUploaded : false,
      url : '',
    }
    this.attachments.push(data)
    this.toastService.showToast("ATTACHED_SUCCESSFULLY","success")
    this.saveDataToLocalDb()
  }

  openLinkModal(){
    const dialogRef = this.dialog.open(AddLinkPopupComponent,{
      width:'400px',
      disableClose:true,
    })

    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        let linkData = {
          name: data,
          type: 'link',
          isUploaded: false,
          url: ''
        }
        this.attachments.push(linkData)
        this.saveDataToLocalDb()
        this.toastService.showToast("ATTACHED_SUCCESSFULLY","success")
      }
    })
  }

  async deleteConfirmation(data:any){
    let dialogData= {
      title: "DELETE_ATTACHMENT_CONFIRMATION_MSG",
      actionButtons: [
        { label: "YES", action: true },
        { label: "NO", action: false}
      ]
    }
    let response = await this.utils.showDialogPopup(dialogData)
    if(response){
      this.removeAttachment(data.file,data.index)
    }
  }

  removeAttachment(item:any,idx:any){
    this.db.deleteData(item.name)
    this.attachments.splice(idx,1)
    this.saveDataToLocalDb()
  }

  saveDataToLocalDb(){
    if(this.taskId){
      this.taskDetails.remarks = this.remarks
      this.taskDetails.attachments = this.attachments
      this.taskDetails.isEdit = true
      this.projectDetails.isEdit = true
      this.projectDetails.tasks[this.taskIndex] = this.taskDetails
    }else{
      this.projectDetails.remarks = this.remarks
      this.projectDetails.attachments = this.attachments
      this.projectDetails.isEdit = true
    }
    let data = {
      key: this.projectDetails._id,
      data: this.projectDetails
    }
    this.db.updateData(data)
  }

  goBack(){
    if(this.taskId){
      this.routingService.navigate(`task-details/${this.taskId}/${this.projectId}`)
    }else{
      this.routingService.navigate(`/details/${this.projectId}`)
    }
  }

  showPrivacyPolicyPopup(option:any){
    const dialogRef = this.dialog.open(PrivacyPolicyPopupComponent,{
      width:'400px',
      minHeight:'150px'
    })

    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        if(data.isChecked && data.upload){
          this.uploadFiles(option)
        }else{
          this.toastService.showToast('ACCEPT_POLICY_ERROR_MSG',"danger")
        }
      }
    })
  }

  addFiles(){
    if(this.taskId){
      this.routingService.navigate(`task-details/${this.taskId}/${this.projectId}`)
    }else{
      this.showConfirmationPopup()
    }
  }

  async showConfirmationPopup(){
    let dialogData= {
      title: "SUBMIT_IMPROVEMENT_CONFIRMATION_MSG",
      actionButtons: [
        { label: "CANCEL", action: false},
        { label: "SUBMIT", action: true }
      ]
    }
    let response = await this.utils.showDialogPopup(dialogData)
    if(response){
      this.routingService.navigate('/sync',{projectId:this.projectId, isSubmission: true})
    }
  }
}
