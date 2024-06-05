import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbService } from '../../services/db/db.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'lib-attachment-show-card',
  templateUrl: './attachment-show-card.component.html',
  styleUrl: './attachment-show-card.component.css',
})
export class AttachmentShowCardComponent {
  @Input() attachments: any;
  attachment: any;
  @Output() emitAttachment = new EventEmitter<any>();

  constructor(private db: DbService,private utilService:UtilsService) {}

  ngOnInit(): void {
    this.getAttachment();
  }

  getAttachment() {
    this.db.getData(this.attachments.name).then((data) => {
      this.attachment = data.data;
    });
  }

  actionEmit(data: any) {
    this.emitAttachment.emit(data);
  }

  openAttachment(data: any) {
    if(data.type === 'link'){
      let url = data.name;
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        window.open(url, '_blank');
    }
    else {
      this.db.getData(data.name).then((response) => {
        this.utilService.viewFile(response);
      });
    }
  }
}
