import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-dailog-page',
  templateUrl: './dailog-popup.component.html',
  styleUrl: './dailog-popup.component.css'
})
export class DailogPopupComponent {
dialogBox: {
  title: string,
  No: string,
  Yes: string,
} = {
  title: '',
  No: '',
  Yes: '',
};


constructor(
  public dialogRef: MatDialogRef<DailogPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}
}
