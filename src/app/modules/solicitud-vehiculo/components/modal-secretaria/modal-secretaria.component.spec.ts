import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSecretariaComponent } from './modal-secretaria.component';

describe('ModalSecretariaComponent', () => {
  let component: ModalSecretariaComponent;
  let fixture: ComponentFixture<ModalSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSecretariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
