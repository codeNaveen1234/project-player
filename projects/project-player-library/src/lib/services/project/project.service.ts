import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { ToastService } from '../toast/toast.service';
import { apiUrls } from '../../constants/urlConstants';
import { statusType } from '../../constants/statusConstants';
import { ApiService } from '../api/api.service';
import { firstValueFrom } from 'rxjs';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private utils: UtilsService, private toastService: ToastService, private apiService: ApiService, private routerService: RoutingService) { }

async showSyncSharePopup(type:string, name:string, project:any, taskId?:string){
    let popupDetails= {
      title: "SHAREABLE_FILE",
      actionButtons: [
        { label: "DONT_SYNC", action: false},
        { label: "SYNC_AND_SHARE", action: true }
      ]
    }
    if(project.status != statusType.submitted){
      let response = await this.utils.showDialogPopup(popupDetails)
      if(response){
        if(project.isEdit){
          this.routerService.navigate('/project-details',{type: "sync", projectId: project._id, taskId: taskId, isShare: true, fileName: name})
        }else{
          taskId ? this.getPdfUrl(name, project._id, taskId) : this.getPdfUrl(name, project._id)
        }
      }else{
        this.toastService.showToast("FILE_NOT_SHARED","danger")
      }
    }else{
      taskId ? this.getPdfUrl(name, project._id, taskId) : this.getPdfUrl(name, project._id)
    }
  }

    getPdfUrl(name:string, projectId:string, taskId?:string,loader?:any){
    let url = taskId ? `${apiUrls.SHARE}/${projectId}?tasks=${taskId}` : `${apiUrls.SHARE}/${projectId}`
    const config = {
      url: url
    }
    let showLoader = loader ? false : true ;
    if(showLoader){
      this.utils.startLoader()
    }
    return firstValueFrom(this.apiService.get(config))
        .then(response => {
      this.utils.stopLoader()
      if(response.result && response.result.downloadUrl){
          this.sendMessage(response.result.downloadUrl,name);
      }else{
        this.toastService.showToast("ERROR_IN_DOWNLOADING_MSG","danger")
      }
    }).catch(error=>{
      this.utils.stopLoader()
      this.toastService.showToast("ERROR_IN_DOWNLOADING_MSG","danger")
    })
  }

  sendMessage(data:any,name:any) {
    const message = { type: 'SHARE_LINK', url: data ,name:name};
    window.postMessage(message, '*');
  }

  updateProject(projectId:any,taskData:any, subtaskData:any=null, keys:any=[]){
    let formattedData = this.formatData(taskData,keys)
    if(subtaskData){
      let subtaskFormatted = this.formatData(subtaskData,keys)
      formattedData["children"] = [subtaskFormatted]
    }
    let finalData = { tasks: [formattedData] }
    const config = {
      url: `${apiUrls.UPDATE_PROJECT}${projectId}`,
      payload: finalData
    }
    this.apiService.post(config).subscribe(response => {})
  }

  formatData(data:any, keys:any=[]){
    let finalKeysList = ["_id", "name", "status", "endDate", "externalId"].concat(keys)
    return Object.fromEntries(Object.entries(data).filter(([key]) => finalKeysList.includes(key)))
  }
}