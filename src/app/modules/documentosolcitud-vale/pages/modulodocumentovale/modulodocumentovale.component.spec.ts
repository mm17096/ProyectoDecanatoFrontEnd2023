import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulodocumentovaleComponent } from './modulodocumentovale.component';

describe('ModulodocumentovaleComponent', () => {
  let component: ModulodocumentovaleComponent;
  let fixture: ComponentFixture<ModulodocumentovaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulodocumentovaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulodocumentovaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
