import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';;
import { DataService } from '../../services/data/data.service';
import { ApiService } from '../../services/api/api.service';
import { apiUrls } from '../../constants/urlConstants';
import { Event, NavigationStart, Router } from '@angular/router';

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
  // @Input() url: any
  constructor(private routerService: RoutingService, private db: DbService, private apiService:ApiService, private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    // setTimeout(()=>{
    //   if(this.projectData._id){
    //     this.projectId = this.projectData._id;
    //   } else {
    //     this.solutionId = this.projectData.solutionId;
    //   }
    //   this.storeDataToLocal()
    //   }, 1000)
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          // This indicates a back or forward button press
          console.log('Back button was clicked!(PLAYER)');
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('On changes in player called')
    // if(changes['url'].currentValue){
    //   console.log('Main player input Url: ',changes['url'].currentValue)
    //   this.router.navigate([changes['url'].currentValue])
    // }
    this.dataService.setConfig(changes['config'].currentValue)
    this.projectData = changes['projectData'].currentValue
    if(this.projectData._id){
      this.projectId = this.projectData._id;
    } else {
      this.solutionId = this.projectData.solutionId;
    }
    this.storeDataToLocal()
  }

  navigateToDetails(){
    this.routerService.navigate(`/details/${this.projectId}`)
    // this.router.navigate([`/details/${this.projectId}`],{skipLocationChange:true})
    // this.router.navigate([{outlets: {testA: `/details/${this.projectId}`}}]);
    // this.router.navigate([`/details/${this.projectId}`])
  }

  navigateToTemplate(){
    this.routerService.navigate(`/preview-details/${this.solutionId}`)
    // this.router.navigate([`/preview-details/${this.solutionId}`],{skipLocationChange:true})
    // this.router.navigate([`/preview-details/${this.solutionId}`])
  }

  storeDataToLocal(){
    if(this.projectId){
      this.db.getData(this.projectId).then((data)=>{
        if(data){
          this.routerService.navigate(`/details/${this.projectId}`)
          // this.router.navigate([`/details/${this.projectId}`],{skipLocationChange:true})
          // this.router.navigate([{outlets: {testA: `/details/${this.projectId}`}}]);
          // this.router.navigate([`/details/${this.projectId}`])
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
    // this.routerService.navigate('/')
  }
}
