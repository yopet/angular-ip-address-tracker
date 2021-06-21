import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarComponentSnackComponent } from './snack-bar-component-snack.component';

describe('SnackBarComponentSnackComponent', () => {
  let component: SnackBarComponentSnackComponent;
  let fixture: ComponentFixture<SnackBarComponentSnackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarComponentSnackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarComponentSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
