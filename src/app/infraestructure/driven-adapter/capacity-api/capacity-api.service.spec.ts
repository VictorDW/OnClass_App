import { TestBed } from '@angular/core/testing';

import { CapacityApiService } from './capacity-api.service';

describe('CapacityApiService', () => {
  let service: CapacityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
