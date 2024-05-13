import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-privacy-policy-popup',
  templateUrl: './privacy-policy-popup.component.html',
  styleUrl: './privacy-policy-popup.component.css'
})
export class PrivacyPolicyPopupComponent {
  isChecked:boolean = false

  constructor(public popupRef: MatDialogRef<PrivacyPolicyPopupComponent>, @Inject(MAT_DIALOG_DATA)public data: any){}

  closePopup(data:any){
    let returnData = {
      isChecked: this.isChecked,
      upload: data
    }
    this.popupRef.close(returnData)
  }

}
