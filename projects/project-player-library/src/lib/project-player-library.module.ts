import { NgModule } from '@angular/core';
import { ProjectPlayerLibraryComponent } from './project-player-library.component';
import { MainPlayerComponent } from './pages/main-player/main-player.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from './shared/add-task/add-task.component';
import { DailogBoxComponent } from './shared/dailog-box/dailog-box.component';
import { FilesPageComponent } from './pages/files-page/files-page.component';
import { TaskdetailspageComponent } from './pages/task-details-page/task-details-page.component';
import { IconListComponent } from './shared/icon-list/icon-list.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';

const routes: Routes = [
  { path: 'details', component: DetailsPageComponent },
  { path: 'files', component: FilesPageComponent },
  { path: 'taskdetail/:id', component: TaskdetailspageComponent },
];

@NgModule({
  declarations: [
    ProjectPlayerLibraryComponent,
    MainPlayerComponent,
    DetailsPageComponent,
    AddTaskComponent,
    IconListComponent,
    TaskdetailspageComponent,
    ProjectDetailsPageComponent,
    FilesPageComponent,
    DailogBoxComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProjectPlayerLibraryModule {}
