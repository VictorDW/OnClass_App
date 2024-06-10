import { TestBed } from '@angular/core/testing';

import { BootcampApiService } from './bootcamp-api.service';

describe('BootcampApiService', () => {
  let service: BootcampApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BootcampApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
