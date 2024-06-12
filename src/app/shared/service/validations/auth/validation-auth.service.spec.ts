import { TestBed } from '@angular/core/testing';

import { ValidationAuthService } from './validation-auth.service';

describe('ValidationAuthService', () => {
  let service: ValidationAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
