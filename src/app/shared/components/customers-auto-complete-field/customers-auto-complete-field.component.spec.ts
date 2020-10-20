import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAutoCompleteFieldComponent } from './customers-auto-complete-field.component';

describe('CustomersAutoCompleteFieldComponent', () => {
  let component: CustomersAutoCompleteFieldComponent;
  let fixture: ComponentFixture<CustomersAutoCompleteFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersAutoCompleteFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersAutoCompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
