import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { DailogPopupComponent } from '../../shared/dialog-popup/dailog-popup.component';
import { firstValueFrom } from 'rxjs';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loader: any

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

  viewFile(dataResponse:any){
    const w: any = window.open('', '_blank');
    const iframe = w.document.createElement('iframe');
    iframe.src = dataResponse.data;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    w.document.body.style.margin = '0';
    w.document.body.style.padding = '0';
    w.document.body.style.width = '100%';
    w.document.body.style.height = '100%';
    w.document.body.style.overflow = 'hidden';
    w.document.body.appendChild(iframe);
  }

  startLoader(){
    this.loader = this.dialog.open(LoaderComponent,{
      disableClose: true
    })
  }

  stopLoader(){
    this.loader = this.loader ? this.loader.close() : null
  }
}