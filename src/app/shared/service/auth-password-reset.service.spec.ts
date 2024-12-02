import { TestBed } from '@angular/core/testing';

import { AuthPasswordResetService } from './auth-password-reset.service';

describe('AuthPasswordResetService', () => {
  let service: AuthPasswordResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPasswordResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
