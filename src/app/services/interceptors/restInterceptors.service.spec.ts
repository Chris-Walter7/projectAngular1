import { TestBed } from '@angular/core/testing';

import { RestInterceptorsService } from './restInterceptors.service';

describe('InterceptorsService', () => {
  let service: RestInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
