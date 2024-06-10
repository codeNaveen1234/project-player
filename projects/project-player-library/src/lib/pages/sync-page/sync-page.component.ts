import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../services/routing/routing.service';
import { ToastService } from '../../services/toast/toast.service';
import { DbService } from '../../services/db/db.service';
import { SyncService } from '../../services/sync/sync.service';
import { statusType } from '../../constants/statusConstants';

@Component({
  selector: 'lib-sync-page',
  templateUrl: './sync-page.component.html',
  styleUrls: ['./sync-page.component.css']
})
export class SyncPageComponent {
  projectId:any
  taskId:any
  isShare:any
  fileName:any
  isSubmission:any
  projectDetails:any
  attachmentsList:any = []
  fileUploadCount = 0
  imageUploadIndex = 0
  retryCount = 0
  cloudUploadFailed = false

  constructor(private activatedRoute: ActivatedRoute, private routingService: RoutingService, private toastService: ToastService,
    private db: DbService, private syncService: SyncService) {
    activatedRoute.queryParams.subscribe(params=>{
      this.projectId = params["projectId"]
      this.isSubmission = params['isSubmission'] == 'true'
    })
  }

  ngOnInit() {
    this.getDataFromLocal()
  }

  async getDataFromLocal(){
    await this.db.getData(this.projectId).then(data=>{
      this.projectDetails = data.data
      this.checkForActions()
    })
  }

  checkForActions() {
    this.attachmentsList = this.syncService.getAttachmentsOfProject(this.projectDetails);
    this.attachmentsList.length ? this.getImageUploadUrls() : this.doSyncCall();
  }


  getImageUploadUrls(){
    const project = JSON.parse(JSON.stringify(this.projectDetails))
    this.syncService.getImageUploadUrls(project).then((imageInfo:any) => {
      for (let i = 0; i < this.attachmentsList.length; i++) {
        this.attachmentsList[i].uploadUrl = imageInfo.files[i].url;
        this.attachmentsList[i].cloudStorage = imageInfo.cloudStorage;
        this.attachmentsList[i].url = imageInfo.files[i].url.split('?')[0]
        for (const key of Object.keys(imageInfo.files[i].payload)) {
          this.attachmentsList[i][key] = imageInfo.files[i].payload[key];
        }
      }
      this.cloudUpload(this.attachmentsList[this.imageUploadIndex])
    })
  }

  cloudUpload(imageDetails:any){
    this.syncService.cloudImageUpload(imageDetails).then((success:any) => {
      this.retryCount =0;
      delete this.attachmentsList[this.imageUploadIndex].cloudStorage;
      delete this.attachmentsList[this.imageUploadIndex].uploadUrl;
      delete this.attachmentsList[this.imageUploadIndex].isUploaded;
      delete this.attachmentsList[this.imageUploadIndex].uploadFailed
      if (this.imageUploadIndex + 1 < this.attachmentsList.length) {
        this.imageUploadIndex++;
        this.fileUploadCount++
        this.cloudUpload(this.attachmentsList[this.imageUploadIndex])
      } else {
        if(this.imageUploadIndex == this.fileUploadCount){
          this.doSyncCall()
        }else{
          this.cloudUploadFailed = true
          this.updateDataToDb()
        }
      }
    }).catch((error:any) => {
      this.retryCount++;
      if (this.retryCount > 3) {
        this.attachmentsList[this.imageUploadIndex]['uploadFailed'] = true
        this.attachmentsList[this.imageUploadIndex]['isUploaded'] = false
        delete this.attachmentsList[this.imageUploadIndex].sourcePath
        this.attachmentsList[this.imageUploadIndex].url = ''
        if(this.imageUploadIndex + 1 < this.attachmentsList.length){
          this.imageUploadIndex++
          this.cloudUpload(this.attachmentsList[this.imageUploadIndex])
        }else{
          this.cloudUploadFailed = true
          this.updateDataToDb()
        }
      } else {
        this.cloudUpload(this.attachmentsList[this.imageUploadIndex]);
      }
    })
  }

  doSyncCall(){
    this.projectDetails.status = (this.isSubmission === true) ? statusType.submitted : this.projectDetails.status
    const payload = this.createSyncPayload();
    this.syncService.syncApiRequest(payload).then(data=>{
      data.result.programId ? this.projectDetails['programId'] = data.result.programId : null
      delete this.projectDetails.isEdit
      this.updateDataToDb()
    }).catch(error=>{
    })
  }

  createSyncPayload(){
    const payload = JSON.parse(JSON.stringify(this.projectDetails))
    const filteredTasks = this.projectDetails.tasks.filter((data:any)=>{
      return data.isNew || data.isEdit
    })
    delete payload.createdAt
    delete payload.updatedAt
    delete payload.downloaded
    payload.tasks = filteredTasks
    return this.syncService.removeKeys(payload,['isNew','isEdit'])
  }

  updateDataToDb(){
    let data = {
      key : this.projectId,
      data : this.projectDetails
    }
    this.db.updateData(data)
    this.resetImageUploadVariables()
    this.showToastMessage()
    this.goBack()

  }

  resetImageUploadVariables() {
    this.imageUploadIndex = 0;
    this.attachmentsList = [];
    this.fileUploadCount = 0;
  }

  goBack(){
    this.routingService.navigate(`/details/${this.projectId}`)
  }


  showToastMessage() {
    let toastMessage = this.projectDetails.status === statusType.submitted ? "PROJECT_SUBMISSION_SUCCESSFUL_MSG" : "PROJECT_SYNC_SUCCESSFUL_MSG"
    this.toastService.showToast(toastMessage,"success")
  }

}
