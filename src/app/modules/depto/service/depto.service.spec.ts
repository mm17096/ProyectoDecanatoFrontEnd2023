import { TestBed } from '@angular/core/testing';

import { DeptoService } from './depto.service';

describe('DeptoService', () => {
  let service: DeptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
