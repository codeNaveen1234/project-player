import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
@Input()projectDetails: any = {};
panelOpenStateForCertificate = false;
panelOpenStateForResources = false;
validationTexts!: string[];
learningResources: any[] = [];
ngOnInit(): void {
  this.learningResources = this.projectDetails?.learningResources;
  setTimeout(()=>{
    this.getCertificateCriteria();
  },1000)
}
getCategoryLabels(): string {
  return this.projectDetails.categories.map((item: { label: any; }) => item.label).join(', ');
}

getCertificateCriteria(): string[] {
  this.validationTexts = []; // Initialize validationTexts as an empty array

  const conditions = this.projectDetails?.certificate?.criteria?.conditions;
  if (conditions) {
    for (const conditionKey in conditions) {
      if (Object.prototype.hasOwnProperty.call(conditions, conditionKey)) {
        const condition = conditions[conditionKey];
        if (condition.validationText) {
          this.validationTexts.push(condition.validationText);
        }
      }
    }
  }
  return this.validationTexts;
}

openResource(data:any){
  window.open(data.link, '_blank');
}

}
