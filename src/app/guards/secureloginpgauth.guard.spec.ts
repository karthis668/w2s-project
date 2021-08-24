import { TestBed } from '@angular/core/testing';

import { SecureloginpgauthGuard } from './secureloginpgauth.guard';

describe('SecureloginpgauthGuard', () => {
  let guard: SecureloginpgauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureloginpgauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
