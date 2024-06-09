import { TestBed } from '@angular/core/testing';

import { ValidationCapacityService } from './validation-capacity.service';

describe('ValidationCapacityService', () => {
  let service: ValidationCapacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationCapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
