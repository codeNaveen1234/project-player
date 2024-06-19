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
          this.routerService.navigate('/sync',{projectId: project._id, taskId: taskId, isShare: true, fileName: name})
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

  getPdfUrl(name:string, projectId:string, taskId?:string){
    let url = taskId ? `${apiUrls.SHARE}/${projectId}?tasks=${taskId}` : `${apiUrls.SHARE}/${projectId}`
    const config = {
      url: url
    }
    this.utils.startLoader()
    firstValueFrom(this.apiService.get(config)).then(response=>{
      this.utils.stopLoader()
      if(response.result && response.result.data && response.result.data.downloadUrl){
        this.downloadFile(response.result.data.downloadUrl, name)
      }else{
        this.toastService.showToast("ERROR_IN_DOWNLOADING_MSG","danger")
      }
    }).catch(error=>{
      this.utils.stopLoader()
      this.toastService.showToast("ERROR_IN_DOWNLOADING_MSG","danger")
    })
  }

  downloadFile(url:any, name: string){
    let fileName = name.length > 40 ? name.slice(0,40) + '...' : name
    fetch(url).then(resp => resp.blob()).then(blob => {
      const convertedUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = convertedUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(convertedUrl)
    })
  }
}