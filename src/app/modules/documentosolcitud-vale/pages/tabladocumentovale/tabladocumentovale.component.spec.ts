import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabladocumentovaleComponent } from './tabladocumentovale.component';

describe('TabladocumentovaleComponent', () => {
  let component: TabladocumentovaleComponent;
  let fixture: ComponentFixture<TabladocumentovaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabladocumentovaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabladocumentovaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
