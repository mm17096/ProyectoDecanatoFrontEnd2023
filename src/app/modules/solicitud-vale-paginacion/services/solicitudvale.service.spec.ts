import { TestBed } from '@angular/core/testing';

import { SolicitudvaleService } from './solicitudvale.service';

describe('SolicitudvaleService', () => {
  let service: SolicitudvaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudvaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
