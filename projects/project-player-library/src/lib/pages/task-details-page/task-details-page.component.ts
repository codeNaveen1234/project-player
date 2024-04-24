import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-taskdetails-page',
  // standalone: true,
  // imports: [],
  templateUrl: './task-details-page.component.html',
  styleUrl: './task-details-page.component.css'
})
export class TaskdetailspageComponent implements OnInit{
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any)=>{
      const id = params.get('id');
      console.log(id);
    });

  }
}
