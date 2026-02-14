import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../core/service/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        { provide: UserService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
  });

  it('should reset', () => {
    fixture.detectChanges();
    component.onReset();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    fixture.detectChanges();
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
