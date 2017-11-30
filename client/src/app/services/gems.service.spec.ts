import { TestBed, inject } from '@angular/core/testing';

import { GemsService } from './gems.service';

describe('GemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GemsService]
    });
  });

  it('should be created', inject([GemsService], (service: GemsService) => {
    expect(service).toBeTruthy();
  }));
});
