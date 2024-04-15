import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierChart1Component } from './supplier-chart1.component';

describe('SupplierShart1Component', () => {
  let component: SupplierChart1Component;
  let fixture: ComponentFixture<SupplierChart1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierChart1Component]
    });
    fixture = TestBed.createComponent(SupplierChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
