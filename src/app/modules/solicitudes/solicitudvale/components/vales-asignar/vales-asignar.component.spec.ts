import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValesAsignarComponent } from './vales-asignar.component';

describe('ValesAsignarComponent', () => {
  let component: ValesAsignarComponent;
  let fixture: ComponentFixture<ValesAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValesAsignarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValesAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
