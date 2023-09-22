import { TestBed } from '@angular/core/testing';

import { AuthSecretariaGuard } from './auth-secretaria.guard';

describe('AuthSecretariaGuard', () => {
  let guard: AuthSecretariaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSecretariaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
