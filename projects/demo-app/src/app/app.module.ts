import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { DetailsPageComponent } from '../pages/details-page/details-page.component';

const routes: Routes = [
  { path: 'page1', component: HomePageComponent },
  { path: 'project-details/**', component: DetailsPageComponent },
  { path: 'project-details', component: DetailsPageComponent },
  // { path: '**', redirectTo: 'page1' }
  // { path: '**', component: DetailsPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DetailsPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
