import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbService } from '../../services/db/db.service';

@Component({
  selector: 'lib-attachment-show-card',
  templateUrl: './attachment-show-card.component.html',
  styleUrl: './attachment-show-card.component.css'
})
export class AttachmentShowCardComponent {
@Input() attachments:any;
attachment:any;
@Output() emitAttachment = new EventEmitter<any>();
constructor(private Db:DbService){}
ngOnInit(): void {
  this.getAttachment();
}
getAttachment(){
  this.Db.getData(this.attachments.name).then(data=>{
    this.attachment = data.data;
  })
}
actionEmit(data:any){
  this.emitAttachment.emit(data);
}
}
