import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPlayerLibraryComponent } from './project-player-library.component';

describe('ProjectPlayerLibraryComponent', () => {
  let component: ProjectPlayerLibraryComponent;
  let fixture: ComponentFixture<ProjectPlayerLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPlayerLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPlayerLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
