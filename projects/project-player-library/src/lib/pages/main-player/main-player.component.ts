import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { DbService } from '../../services/db/db.service';;
import { DataService } from '../../services/data/data.service';
import { ApiService } from '../../services/api/api.service';
import { apiUrls } from '../../constants/urlConstants';
import { Event, NavigationEnd, NavigationStart, Router, UrlTree } from '@angular/router';
import { filter } from 'rxjs';

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
    console.log('main player Init',this.projectData)
    // setTimeout(()=>{
    //   if(this.projectData._id){
    //     this.projectId = this.projectData._id;
    //   } else {
    //     this.solutionId = this.projectData.solutionId;
    //   }
    //   this.storeDataToLocal()
    //   }, 1000)
    this.router.navigate([`/project-details/`],{queryParams:{type:'details',id: "667bd7cf27129a25d33143dc"}, replaceUrl:true})
    // setTimeout(()=>{
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event:any) => {
        console.log('URL WAS CHANGED (FROM PLAYER)',event)
        // const urlObj = new URL(event, window.location.origin);
        // const type = urlObj.searchParams.get('type');
        // console.log('TYPE: ',type)
        const urlTree: UrlTree = this.router.parseUrl(event.urlAfterRedirects);
        const type1 = urlTree.queryParams['type'];
        
        console.log('Type ONE:', type1);
        switch (type1) {
          case "details":
            this.router.navigate([`/project-details/`],{queryParams:{type:'details',id: "667bd7cf27129a25d33143dc"}, replaceUrl:true})
            break;
          
          case "task":
            // this.router.navigate([`/project-details/`],{queryParams:{type:"task",taskId:"8d6c4a87-5860-474b-b40a-f8a9b88d5053",projectId:"667bd7cf27129a25d33143dc"}, replaceUrl:true});
            // this.router.navigate([`/project-details/`],{queryParams:{type:'task',id: "667bd7cf27129a25d33143dc"}, replaceUrl:true})
            this.router.navigate([`/project-details/task-details/${'8d6c4a87-5860-474b-b40a-f8a9b88d5053'}/${'667bd7cf27129a25d33143dc'}`],{replaceUrl:true})
          break;

          case "add-file":
            // this.router.navigate([`/project-details/task-details/${'8d6c4a87-5860-474b-b40a-f8a9b88d5053'}/${'667bd7cf27129a25d33143dc'}`],{replaceUrl:true})
            this.router.navigate([`/project-details/add-files/667bd7cf27129a25d33143dc`],{queryParams:{taskId:'8d6c4a87-5860-474b-b40a-f8a9b88d5053'},replaceUrl:true})
          break;
        
          default:
            console.log('Default: ',type1)
            break;
        }
        
      });
      // },0)

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
    console.log('main player Onchanges',this.projectData)
    // console.log('On changes in player called')
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
    // this.router.navigate([`/project-details/`],{queryParams:{type:'details',id: "667bd7cf27129a25d33143dc"}, replaceUrl:true})
    // setTimeout(()=>{
    // this.storeDataToLocal()
    // },0)
  }

  navigateToDetails(){
    // this.routerService.navigate(`/project-details/${this.projectId}`)
    // this.router.navigate([`/details/${this.projectId}`],{skipLocationChange:true})
    // this.router.navigate([{outlets: {testA: `/details/${this.projectId}`}}]);
    // this.router.navigate([`/project-details/`],{queryParams:{type:'details',id: this.projectId}, replaceUrl:true})
  }

  navigateToTemplate(){
    this.routerService.navigate(`/preview-details/${this.solutionId}`)
    // this.router.navigate([`/preview-details/${this.solutionId}`],{skipLocationChange:true})
    // this.router.navigate([`/preview-details/${this.solutionId}`])
  }

  storeDataToLocal(){
    // console.log('Store data to local called',this.projectId,this.projectData)
    if(this.projectId){
      // console.log('YES')
      this.db.getData(this.projectId).then((data)=>{
        // console.log('Data from local: ',data)
        if(data){
          // this.routerService.navigate(`/project-details/${this.projectId}`)
          // this.router.navigate([`/details/${this.projectId}`],{skipLocationChange:true})
          // this.router.navigate([{outlets: {testA: `/details/${this.projectId}`}}]);
          // this.router.navigate([`/project-details/`],{queryParams:{type:'details',id: this.projectId}, replaceUrl:true})
        }else{
          // console.log('NO ONE')
          this.getProjectDetails()
        }      
        }).catch((res)=>{
          // console.log('NO TWO',res)
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
