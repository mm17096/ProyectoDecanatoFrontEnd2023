import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaentradasalidaComponent } from './vistaentradasalida.component';

describe('VistaentradasalidaComponent', () => {
  let component: VistaentradasalidaComponent;
  let fixture: ComponentFixture<VistaentradasalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaentradasalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaentradasalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
