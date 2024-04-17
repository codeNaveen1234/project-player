import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdetailspageComponent } from './task-details-page.component';

describe('TaskdetailspageComponent', () => {
  let component: TaskdetailspageComponent;
  let fixture: ComponentFixture<TaskdetailspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskdetailspageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskdetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
