import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPrinterComponent } from './app-printer.component';

describe('AppPrinterComponent', () => {
  let component: AppPrinterComponent;
  let fixture: ComponentFixture<AppPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPrinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
