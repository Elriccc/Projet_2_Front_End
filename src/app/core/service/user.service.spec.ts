import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Student } from '../models/Student';
import { Register } from '../models/Register';
import { Login } from '../models/Login';

describe('StudentService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should register', () => {
    const register: Register = {
      firstName: 'Test',
      lastName: 'Test',
      login: 'TestUser',
      password: '1234'
    }

    service.register(register).subscribe((response) => {
      expect(response).equal(register);
    });

    const req = httpTestingController.expectOne('/api/register');
    req.flush(register);
  });

  it('should fetch student', () => {
    const login: Login = {
      login: 'TestUser',
      password: '1234'
    }
    service.login(login).subscribe((response) => {
      expect(response).equal(login);
    });

    const req = httpTestingController.expectOne('/api/login');
    req.flush(login);
  });
});
