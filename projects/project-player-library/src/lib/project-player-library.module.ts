import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { DailogPopupComponent } from './shared/dialog-popup/dailog-popup.component';
import { AttachmentListingPageComponent } from './pages/attachment-listing-page/attachment-listing-page.component';
import { TaskDetailsPageComponent } from './pages/task-details-page/task-details-page.component';
import { IconListComponent } from './shared/icon-list/icon-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { SubtaskCardComponent } from './shared/subtask-card/subtask-card.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditTaskCardComponent } from './shared/edit-task-card/edit-task-card.component';
import { AttachmentCardComponent } from './shared/attachment-card/attachment-card.component';
import { AttachmentShowCardComponent } from './shared/attachment-show-card/attachment-show-card.component';

const routes: Routes = [
  { path: 'details', component: DetailsPageComponent },
  { path: 'files', component: AttachmentListingPageComponent },
  { path: 'task-details/:id', component: TaskDetailsPageComponent },
];

export function translateHttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ProjectPlayerLibraryComponent,
    MainPlayerComponent,
    DetailsPageComponent,
    TaskCardComponent,
    IconListComponent,
    TaskDetailsPageComponent,
    ProjectDetailsComponent,
    AttachmentListingPageComponent,
    AttachmentCardComponent,
    AttachmentShowCardComponent,
    SubtaskCardComponent,
    EditTaskCardComponent,
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
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [RouterModule],
})
export class ProjectPlayerLibraryModule {
  constructor(private translate: TranslateService) {
    this.setLanguage();
  }

  setLanguage() {
    this.translate.setTranslation('en', require('./assets/i18n/en.json'));
    this.translate.setDefaultLang('en');
  }
}
