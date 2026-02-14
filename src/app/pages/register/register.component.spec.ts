import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../core/service/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideHttpClient(),
        { provide: UserService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should reset', () => {
    fixture.detectChanges();
    component.onReset();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    fixture.detectChanges();
    component.form["firstName"].setValue('Test')
    component.form["lastName"].setValue('Test')
    component.form["login"].setValue('TestUser')
    component.form["password"].setValue('1234')
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should not submit with invalid datas', () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
