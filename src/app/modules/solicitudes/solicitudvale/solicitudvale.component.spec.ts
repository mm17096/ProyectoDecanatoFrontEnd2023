import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudvaleComponent } from './solicitudvale.component';

describe('SolicitudvaleComponent', () => {
  let component: SolicitudvaleComponent;
  let fixture: ComponentFixture<SolicitudvaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudvaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudvaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
