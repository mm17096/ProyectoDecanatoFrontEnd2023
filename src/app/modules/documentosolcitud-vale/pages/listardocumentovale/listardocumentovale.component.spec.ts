import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListardocumentovaleComponent } from './listardocumentovale.component';

describe('ListardocumentovaleComponent', () => {
  let component: ListardocumentovaleComponent;
  let fixture: ComponentFixture<ListardocumentovaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListardocumentovaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListardocumentovaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
