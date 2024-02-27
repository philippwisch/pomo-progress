import { TestBed } from '@angular/core/testing';

import { TaskTrackingService } from './task-tracking.service';

describe('TaskTrackingService', () => {
  let service: TaskTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
