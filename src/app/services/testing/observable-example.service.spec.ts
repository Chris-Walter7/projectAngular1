import { TestBed } from '@angular/core/testing';

import { ObservableExampleService } from './observable-example.service';

describe('TestingService', () => {
  let service: ObservableExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservableExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
