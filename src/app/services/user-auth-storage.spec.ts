import { TestBed } from '@angular/core/testing';

import { UserAuthStorage } from './user-auth-storage.service';

describe('UserAuthStorage', () => {
  let service: UserAuthStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
