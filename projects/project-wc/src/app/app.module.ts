import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ProjectPlayerLibraryModule, MainPlayerComponent } from 'projects/project-player-library/src/public-api';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ProjectPlayerLibraryModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const customElement = createCustomElement(MainPlayerComponent,{injector : this.injector})
    customElements.define('project-player',customElement)
  }
}
