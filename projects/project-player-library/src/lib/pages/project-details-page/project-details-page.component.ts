import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-project-details-page',
  // standalone: true,
  // imports: [],
  templateUrl: './project-details-page.component.html',
  styleUrl: './project-details-page.component.css'
})
export class ProjectDetailsPageComponent {
@Input()projectdetais: any = {};
}
