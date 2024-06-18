import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbService } from '../../services/db/db.service';
import { UtilsService } from '../../services/utils/utils.service';
import { statusType } from 'dist/project-player-library/lib/constants/statusConstants';

@Component({
  selector: 'lib-attachment-show-card',
  templateUrl: './attachment-show-card.component.html',
  styleUrl: './attachment-show-card.component.css',
})
export class AttachmentShowCardComponent {
  @Input() attachments: any;
  @Input() projectDataStatus:any;
  attachment: any;
  @Output() emitAttachment = new EventEmitter<any>();
  statusType = statusType;

  constructor(private db: DbService,private utilService:UtilsService) {}

  ngOnInit(): void {
    this.getAttachment();
  }

  getAttachment() {
    this.db.getData(this.attachments.name).then((data) => {
      this.attachment = data.data;
    }).catch((res)=>{
      this.attachment = this.attachments.url;
    })
  }

  actionEmit(data: any) {
    this.emitAttachment.emit(data);
  }

  openAttachment(data: any) {
    if(!data.url){
      if(data.type === 'link'){
        let url = data.name;
          if (!/^https?:\/\//i.test(url)) {
              url = 'http://' + url;
          }
          window.open(url, '_blank');
      }
      else {
        this.db.getData(data.name).then((response) => {
          if(!data.type.includes('video')){
            this.utilService.viewFile(response.data);
          }
          else{
            this.utilService.viewVideo(response.data);
          }
        });
      }
    }
    else {
      if(!data.type.includes('video')){
        this.utilService.viewFile(data.url);
      }
      else{
        this.utilService.viewVideo(data.url);
      }
    }
  }


}
