import { TestBed } from '@angular/core/testing';

import { SecureotherpgsauthGuard } from './secureotherpgsauth.guard';

describe('SecureotherpgsauthGuard', () => {
  let guard: SecureotherpgsauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureotherpgsauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
