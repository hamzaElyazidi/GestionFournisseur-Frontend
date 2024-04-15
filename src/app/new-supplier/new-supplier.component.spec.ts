import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplierComponent } from './new-supplier.component';

describe('NewSupplierComponent', () => {
  let component: NewSupplierComponent;
  let fixture: ComponentFixture<NewSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSupplierComponent]
    });
    fixture = TestBed.createComponent(NewSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
