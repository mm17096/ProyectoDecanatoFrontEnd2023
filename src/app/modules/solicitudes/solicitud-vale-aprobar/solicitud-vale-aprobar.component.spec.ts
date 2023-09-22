import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudValeAprobarComponent } from './solicitud-vale-aprobar.component';

describe('SolicitudValeAprobarComponent', () => {
  let component: SolicitudValeAprobarComponent;
  let fixture: ComponentFixture<SolicitudValeAprobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudValeAprobarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudValeAprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
