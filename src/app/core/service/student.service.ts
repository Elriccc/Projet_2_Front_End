import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Object> {
    return this.httpClient.get('/api/student', {headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')}});
  }

  getByStudentNumber(studentNumber: String): Observable<Object> {
    return this.httpClient.get('/api/student/' + studentNumber, {headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')}});
  }

  createStudent(student: Student): Observable<Object> {
    return this.httpClient.post('/api/student', student, {headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')}});
  }

  updateStudent(studentNumber: String, student: Student): Observable<Object> {
    return this.httpClient.put('/api/student/' + studentNumber, student, {headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')}});
  }

  delete(studentNumber: String): Observable<Object> {
    return this.httpClient.delete('/api/student/' + studentNumber, {headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')}});
  }
}
