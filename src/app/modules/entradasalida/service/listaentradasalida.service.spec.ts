import { TestBed } from '@angular/core/testing';

import { ListaentradasalidaService } from './listaentradasalida.service';

describe('ListaentradasalidaService', () => {
  let service: ListaentradasalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaentradasalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
