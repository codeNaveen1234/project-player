import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DailogBoxComponent } from '../dailog-box/dailog-box.component';

@Component({
  selector: 'lib-icon-list',
  // standalone: true,
  // imports: [],
  templateUrl: './icon-list.component.html',
  styleUrl: './icon-list.component.css'
})
export class IconListComponent {
  downloaded: boolean = false;
  synced:boolean=false;
  @Input() submittedimprovement: any;
  constructor(private router: Router,private dialog: MatDialog){}
  downloadproject() {
    this.downloaded = true;
  }
  Syncproject(){
    this.synced=true;
  }
  movetofiles() {
    this.router.navigate(['/files'], { skipLocationChange: true });
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const modelref = this.dialog.open(DailogBoxComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    modelref.componentInstance.dialogbox ={
      title:'We need to sync your data to generate a shareable file ?',
      Yes:`Sync and share`,
      No:`Don't sync`,
    }
    modelref.afterClosed().subscribe((res: boolean) => {
      if (res) {
        console.log('you have selected sync and share respectively' );
      } else {
        console.log(`you have selected Don't sync.`);
      }
    });
  }
}
