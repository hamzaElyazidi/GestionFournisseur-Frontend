import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierShart2Component } from './supplier-shart2.component';

describe('SupplierShart2Component', () => {
  let component: SupplierShart2Component;
  let fixture: ComponentFixture<SupplierShart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierShart2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierShart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
