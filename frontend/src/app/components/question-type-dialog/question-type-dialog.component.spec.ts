import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeDialogComponent } from './question-type-dialog.component';

describe('QuestionTypeDialogComponent', () => {
  let component: QuestionTypeDialogComponent;
  let fixture: ComponentFixture<QuestionTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTypeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
