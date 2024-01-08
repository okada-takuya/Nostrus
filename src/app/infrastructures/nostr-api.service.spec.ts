import { TestBed } from '@angular/core/testing';

import { NostrApiService } from './nostr-api.service';

describe('NostrApiService', () => {
  let service: NostrApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NostrApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
