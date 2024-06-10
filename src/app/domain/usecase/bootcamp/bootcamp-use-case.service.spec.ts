import { TestBed } from '@angular/core/testing';

import { BootcampUseCaseService } from './bootcamp-use-case.service';

describe('BootcampUseCaseService', () => {
  let service: BootcampUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BootcampUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
