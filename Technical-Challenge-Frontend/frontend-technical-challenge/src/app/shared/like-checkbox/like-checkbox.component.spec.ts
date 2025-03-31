import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeCheckboxComponent } from './like-checkbox.component';

describe('LikeCheckboxComponent', () => {
  let component: LikeCheckboxComponent;
  let fixture: ComponentFixture<LikeCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
