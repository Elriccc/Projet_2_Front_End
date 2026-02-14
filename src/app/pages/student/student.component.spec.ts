import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { provideHttpClient } from '@angular/common/http';
import { StudentService } from '../../core/service/student.service';
import { RouterModule } from '@angular/router'

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), StudentComponent],
      providers: [
        provideHttpClient(),
        { provide: StudentService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    component.form["studentNumber"].setValue('000001')
    component.form["firstName"].setValue('John')
    component.form["lastName"].setValue('Smith')
    component.form["birthDate"].setValue('2000-02-01')
    component.form["email"].setValue('johnsmith@gmail.com')
    component.form["phoneNumber"].setValue('0606060606')
    component.form["subscribeStart"].setValue('2026-01-01')
    component.form["subscribeEnd"].setValue('2020-01-01')

    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should reset', () => {
    fixture.detectChanges();
    component.onReset();
    expect(component).toBeTruthy();
  });

  it('should not submit with invalid datas', () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
