import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmStartImprovementComponent } from './confirm-start-improvement.component';

describe('ConfirmStartImprovementComponent', () => {
  let component: ConfirmStartImprovementComponent;
  let fixture: ComponentFixture<ConfirmStartImprovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmStartImprovementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmStartImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
