import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-attachment-show-card',
  templateUrl: './attachment-show-card.component.html',
  styleUrl: './attachment-show-card.component.css'
})
export class AttachmentShowCardComponent {
@Input() attachments:any;
@Output() emitAttachment = new EventEmitter<any>();
constructor(){}
actionEmit(data:any){
  this.emitAttachment.emit(data);
}
}
