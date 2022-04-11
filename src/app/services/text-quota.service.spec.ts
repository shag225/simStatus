import { TestBed } from '@angular/core/testing';

import { TextQuotaService } from './text-quota.service';

describe('TextQuotaService', () => {
  let service: TextQuotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextQuotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
