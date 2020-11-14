import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceDeleteDialogComponent } from './ressource-delete-dialog.component';

describe('RessourceDeleteDialogComponent', () => {
  let component: RessourceDeleteDialogComponent;
  let fixture: ComponentFixture<RessourceDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
