import { TestBed } from '@angular/core/testing';

import { CapacityUseCaseService } from './capacity-use-case.service';

describe('CapacityUseCaseService', () => {
  let service: CapacityUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacityUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
