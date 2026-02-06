import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { Login } from '../models/Login';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  register(user: Register): Observable<Object> {
    return this.httpClient.post('/api/register', user);
  }

  login(user: Login): Observable<Object> {
    let httpParams = new HttpParams()
      .append('login', user.login)
      .append('password', user.password) 
    return this.httpClient.post('/api/login', httpParams, {responseType: 'text'});
  }
}
