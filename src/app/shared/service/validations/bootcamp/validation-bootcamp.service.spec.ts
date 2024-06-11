import { TestBed } from '@angular/core/testing';

import { ValidationBootcampService } from './validation-bootcamp.service';

describe('ValidationBootcampService', () => {
  let service: ValidationBootcampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationBootcampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
