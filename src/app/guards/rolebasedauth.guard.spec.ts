import { TestBed } from '@angular/core/testing';

import { RolebasedauthGuard } from './rolebasedauth.guard';

describe('RolebasedauthGuard', () => {
  let guard: RolebasedauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolebasedauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
