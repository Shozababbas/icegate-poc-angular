import { TestBed } from '@angular/core/testing';

import { CaptchServiceService } from './captch-service.service';

describe('CaptchServiceService', () => {
  let service: CaptchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
