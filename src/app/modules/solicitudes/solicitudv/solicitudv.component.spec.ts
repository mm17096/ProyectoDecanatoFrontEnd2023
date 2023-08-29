import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudvComponent } from './solicitudv.component';

describe('SolicitudvComponent', () => {
  let component: SolicitudvComponent;
  let fixture: ComponentFixture<SolicitudvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
