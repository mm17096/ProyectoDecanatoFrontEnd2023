import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocumentosComponent } from './modal-documentos.component';

describe('ModalDocumentosComponent', () => {
  let component: ModalDocumentosComponent;
  let fixture: ComponentFixture<ModalDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
