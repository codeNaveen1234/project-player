import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.navigate()
  }

  navigate(){
    this.router.navigate(['/details'],{skipLocationChange:true})
  }

}
