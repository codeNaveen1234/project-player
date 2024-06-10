import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'lib-add-link-popup',
  templateUrl: './add-link-popup.component.html',
  styleUrls: ['./add-link-popup.component.css']
})
export class AddLinkPopupComponent {
  link:any

  constructor(public popupRef: MatDialogRef<AddLinkPopupComponent>, @Inject(MAT_DIALOG_DATA)public data: any,
  private toastService: ToastService) {}

  ngOnInit(){
  }

  addLink(data:any){
    this.popupRef.close(data)
  }

  onChange($event:any){
    let data = $event.target.value
    if(this.validateLink(data)){
      $event.target.value = data.slice(0,-1)
    }
  }

  pasteLink($event:any){
    let data = $event.clipboardData.getData('Text') 
    if(this.validateLink(data)){
      $event.preventDefault()
    }
  }

  validateLink(value:any){
    let invalidCharacters = /^[^!@~#$%^*(){}><,\n; ]+$/
    if(invalidCharacters.test(value)){
     return false
    }else{
      if(value){
        this.toastService.showToast("INVALID_LINK_MSG","danger")
      }
      return true
    }
  }
}