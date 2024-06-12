import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-confirm-start-improvement',
  templateUrl: './confirm-start-improvement.component.html',
  styleUrl: './confirm-start-improvement.component.css'
})
export class ConfirmStartImprovementComponent {
  constructor(public popupRef: MatDialogRef<ConfirmStartImprovementComponent>, @Inject(MAT_DIALOG_DATA)public data: any){}

  closePopup(data : any){
   return this.popupRef.close(data);
  }
}
