import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input()title:any

  constructor(private location: Location){}

  goBack(){
    this.location.back()
  }
}
