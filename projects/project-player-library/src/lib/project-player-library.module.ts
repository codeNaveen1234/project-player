import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule,} from '@angular/forms';
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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { DailogPopupComponent } from './shared/dialog-popup/dailog-popup.component';
import { AttachmentListingPageComponent } from './pages/attachment-listing-page/attachment-listing-page.component';
import { TaskdetailspageComponent } from './pages/task-details-page/task-details-page.component';
import { IconListComponent } from './shared/icon-list/icon-list.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { SubtaskCardComponent } from './shared/subtask-card/subtask-card.component';

const routes: Routes = [
  { path: 'details', component: DetailsPageComponent },
  { path: 'files', component: AttachmentListingPageComponent },
  { path: 'task-details/:id', component: TaskdetailspageComponent },
];

@NgModule({
  declarations: [
    ProjectPlayerLibraryComponent,
    MainPlayerComponent,
    DetailsPageComponent,
    TaskCardComponent,
    IconListComponent,
    TaskdetailspageComponent,
    ProjectDetailsPageComponent,
    AttachmentListingPageComponent,
    SubtaskCardComponent,
    DailogPopupComponent,
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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProjectPlayerLibraryModule {}
