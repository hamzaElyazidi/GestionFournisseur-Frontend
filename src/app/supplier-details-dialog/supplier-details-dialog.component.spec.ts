import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDetailsDialogComponent } from './supplier-details-dialog.component';

describe('SupplierDetailsDialogComponent', () => {
  let component: SupplierDetailsDialogComponent;
  let fixture: ComponentFixture<SupplierDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
