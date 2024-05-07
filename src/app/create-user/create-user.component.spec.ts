import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUSerComponent } from './create-user.component';

describe('CreateUSerComponent', () => {
  let component: CreateUSerComponent;
  let fixture: ComponentFixture<CreateUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUSerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
