import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-dailog-page',
  // standalone: true,
  // imports: [],
  templateUrl: './dailog-box.component.html',
  styleUrl: './dailog-box.component.css'
})
export class DailogBoxComponent {
dialogbox: {
  title: string,
  No: string,
  Yes: string,
} = {
  title: '',
  No: '',
  Yes: '',
};


constructor(
  public dialogRef: MatDialogRef<DailogBoxComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}
confirmDeletion(): void {
  this.dialogRef.close(true);
}
cancel(): void {
  this.dialogRef.close(false);
}
}
