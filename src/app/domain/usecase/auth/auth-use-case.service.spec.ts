import { TestBed } from '@angular/core/testing';

import { AuthUseCaseService } from './auth-use-case.service';

describe('AuthUseCaseService', () => {
  let service: AuthUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
