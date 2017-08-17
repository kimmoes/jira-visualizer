import { TestBed, inject } from '@angular/core/testing';

import { UserStoryService } from './user-story.service';

describe('UserStoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStoryService]
    });
  });

  it('should be created', inject([UserStoryService], (service: UserStoryService) => {
    expect(service).toBeTruthy();
  }));
});
