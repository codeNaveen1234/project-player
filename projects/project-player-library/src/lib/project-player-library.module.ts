import { NgModule } from '@angular/core';
import { ProjectPlayerLibraryComponent } from './project-player-library.component';
import { MainPlayerComponent } from './pages/main-player/main-player.component';



@NgModule({
  declarations: [
    ProjectPlayerLibraryComponent,
    MainPlayerComponent
  ],
  imports: [
  ],
  exports: [
    MainPlayerComponent
  ]
})
export class ProjectPlayerLibraryModule { }
