import { TestBed } from '@angular/core/testing';
import { StudentService } from './student.service';
import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Student } from '../models/Student';

describe('StudentService', () => {
  let service: StudentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(StudentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch students', () => {
    const mockStudents = [{ studentNumber: '000001', firstName: 'John', lastName: 'Smith', birthDate: '01/02/2000' }];

    service.getAll().subscribe((students) => {
      expect(students).equal(mockStudents);
    });

    const req = httpTestingController.expectOne('/api/student');
    req.flush(mockStudents);
  });

  it('should fetch student', () => {
    const studentNumber = '000001'
    const mockStudent = { studentNumber: studentNumber, firstName: 'John', lastName: 'Smith', birthDate: '01/02/2000' };

    service.getByStudentNumber(studentNumber).subscribe((student) => {
      expect(student).equal(mockStudent);
    });

    const req = httpTestingController.expectOne('/api/student/'+studentNumber);
    req.flush(mockStudent);
  });

  it('should create student', () => {
    const mockStudent: Student = {
      studentNumber: '000001', 
      firstName: 'John', 
      lastName: 'Smith', birthDate: '01/02/2000',
      email: '',
      phoneNumber: '',
      subscribeStart: '',
      subscribeEnd: ''
    };

    service.createStudent(mockStudent).subscribe((response) => {
      expect(response).equal(mockStudent);
    });

    const req = httpTestingController.expectOne('/api/student');
    req.flush(mockStudent);
  })

  it('should update student', () => {
    const studentNumber = '000001'
    const mockStudent: Student = {
      studentNumber: '', 
      firstName: 'John', 
      lastName: 'Smith', birthDate: '01/02/2000',
      email: '',
      phoneNumber: '',
      subscribeStart: '',
      subscribeEnd: ''
    };

    service.updateStudent(studentNumber, mockStudent).subscribe((response) => {
      expect(response).equal(mockStudent);
    });

    const req = httpTestingController.expectOne('/api/student/'+studentNumber);
    req.flush(mockStudent);
  })

  it('should delete student', () => {
    const studentNumber = '000001'

    service.delete(studentNumber).subscribe((response) => {
      expect(response).equal(studentNumber);
    });
  })
});
