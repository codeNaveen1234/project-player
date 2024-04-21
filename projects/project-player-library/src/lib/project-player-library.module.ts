import { NgModule } from '@angular/core';
import { ProjectPlayerLibraryComponent } from './project-player-library.component';
import { MainPlayerComponent } from './pages/main-player/main-player.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path:'details', component:DetailsPageComponent }
]

export function translateHttpLoaderFactory (httpClient: HttpClient){
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ProjectPlayerLibraryComponent,
    MainPlayerComponent,
    DetailsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide : TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps : [HttpClient],
      },
    })
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectPlayerLibraryModule {
  constructor(private translate: TranslateService){
    this.setLanguage()
  }

  setLanguage(){
    this.translate.setTranslation('en',require('./assets/i18n/en.json'))
    this.translate.setDefaultLang('en')
  }
}
