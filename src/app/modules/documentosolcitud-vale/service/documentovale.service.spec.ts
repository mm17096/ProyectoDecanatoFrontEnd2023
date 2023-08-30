import { TestBed } from '@angular/core/testing';

import { DocumentovaleService } from './documentovale.service';

describe('DocumentovaleService', () => {
  let service: DocumentovaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentovaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
