import { TestBed } from '@angular/core/testing';

import { ProjectPlayerLibraryService } from './project-player-library.service';

describe('ProjectPlayerLibraryService', () => {
  let service: ProjectPlayerLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPlayerLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
