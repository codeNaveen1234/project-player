import { NgModule } from '@angular/core';
import { ProjectPlayerLibraryComponent } from './project-player-library.component';
import { MainPlayerComponent } from './pages/main-player/main-player.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'details', component:DetailsPageComponent }
]

@NgModule({
  declarations: [
    ProjectPlayerLibraryComponent,
    MainPlayerComponent,
    DetailsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectPlayerLibraryModule { }
