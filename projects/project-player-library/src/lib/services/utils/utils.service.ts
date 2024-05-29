import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private dialog: MatDialog) { }

  getMetaData() {
    let metaData = {
      _id: uuidv4(),
      status: "notStarted",
      name: "",
      endDate: "",
      assignee: "",
      type: "simple",
      attachments: [],
      startDate: "",
      isNew: true,
      isEdit: true,
      children: [],
      isDeleted: false,
      isDeletable: true
    };

    return metaData
  }

  async showDialogPopup(data:any,width?:any){
    const dialogRef = this.dialog.open(DailogPopupComponent, {
      width: width ? width : '400px',
      data: data
    });
    let response = await firstValueFrom(dialogRef.afterClosed())
    return response
  }
}