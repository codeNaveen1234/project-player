import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';;
import { DataService } from '../../services/data/data.service';
import { ApiService } from '../../services/api/api.service';
import { apiUrls } from '../../constants/urlConstants';
import { NavigationEnd, Router, UrlTree } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { DetailsPageComponent } from '../details-page/details-page.component';
import { TaskDetailsPageComponent } from '../task-details-page/task-details-page.component';
import { AddFilesPageComponent } from '../add-files-page/add-files-page.component';
import { AddTaskPageComponent } from '../add-task-page/add-task-page.component';
import { AttachmentListingPageComponent } from '../attachment-listing-page/attachment-listing-page.component';
import { SyncPageComponent } from '../sync-page/sync-page.component';
import { PreviewDetailsPageComponent } from '../preview-details-page/preview-details-page.component';
import { LearningResourcesComponent } from '../learning-resources/learning-resources.component';
import { UtilsService } from '../../services/utils/utils.service';
import { CertificatePageComponent } from '../certificate-page/certificate-page.component';

@Component({
  selector: 'lib-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit {
  projectDetails:any;
  projectId:any;
  solutionId:any;
  @Input() projectData:any;
  @Input() config: any
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) dynamicComponent!: ViewContainerRef;
  private routerSubscription!: Subscription;
  constructor(private routerService: RoutingService, private db: DbService, private apiService:ApiService, private dataService: DataService, private router: Router,
    private utils: UtilsService
  ) {}

  private componentMapper: any = {
    details: DetailsPageComponent,
    taskDetails: TaskDetailsPageComponent,
    addFile: AddFilesPageComponent,
    addTask: AddTaskPageComponent,
    attachments: AttachmentListingPageComponent,
    sync: SyncPageComponent,
    template: PreviewDetailsPageComponent,
    resources: LearningResourcesComponent,
    certificate: CertificatePageComponent

  };

  ngOnInit() {
      this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event:any) => {
        const urlTree: UrlTree = this.router.parseUrl(event.urlAfterRedirects);
        const type = urlTree.queryParams['type'];
        this.loadComponent(type);
      });
  }

  loadComponent(type: string) {
    this.dynamicComponent.clear();
    const componentType = this.componentMapper[type];
    if (componentType) {
      this.dynamicComponent.createComponent(componentType);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataService.setConfig(changes['config'].currentValue)
    this.projectData = changes['projectData'].currentValue
    if(this.utils.isLoggedIn()){
      setTimeout(() => {
        if(this.projectData.referenceFrom == "certificate"){
          let urlQueryParams = this.getQueryParams(window.location.search)
          this.routerService.navigate(window.location.pathname, urlQueryParams, { replaceUrl: true })
          return
        }
        if(this.projectData.referenceFrom == "library"){
          this.routerService.navigate("/project-details",{ type:'template' },{ replaceUrl:true, state: this.projectData })
          return
        }
        let id = this.projectData?._id || this.projectData?.projectId
        if(id){
          this.projectId = id;
        } else {
          this.solutionId = this.projectData.solutionId;
        }
        this.storeDataToLocal()
      }, 100);
    }else{
      this.routerService.navigate("/project-details",{ type:'template',id: this.projectData.link },{ replaceUrl:true, state: this.projectData })
    }

  }

  navigateToDetails(){
    this.routerService.navigate("/project-details",{ type:'details',id: this.projectId },{ replaceUrl:true })
  }

  navigateToTemplate(){
    this.routerService.navigate("/project-details",{ type:'template',id: this.solutionId },{ replaceUrl:true, state: this.projectData })
  }

  storeDataToLocal(){
    if(this.projectId){
      this.db.getData(this.projectId).then((data)=>{
        if(data){
          this.navigateToDetails()
        }else{
          this.getProjectDetails()
        }
        }).catch((res)=>{
          this.getProjectDetails()
      })
    }
    else {
      this.navigateToTemplate()
    }
  }

  getProjectDetails(){
    const configForProjectId = {
      url: `${apiUrls.GET_PROJECT_DETAILS}/${this.projectId}`,
      payload: {}
    }
      this.apiService.post(configForProjectId).subscribe((res)=>{
        this.projectDetails = res.result;
        if(this.projectDetails){
          let data = {
            key: this.projectDetails._id,
            data: this.projectDetails
          }
          this.db.addData(data)
          this.navigateToDetails()
        }
      })
  }

  ngOnDestroy(){
    this.dataService.clearConfig()
    this.routerService.navigate('/',{},{skipLocationChange: true})
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  getQueryParams(queryParams:any){
    const queryObj: any = {}

    if (queryParams.startsWith('?')) {
      queryParams = queryParams.substring(1);
    }

    const queryArray = queryParams.split('&');

    queryArray.forEach((query:any) => {
        const [key, value] = query.split('=');
        queryObj[key] = value 
    });
    return queryObj;
  }
}
