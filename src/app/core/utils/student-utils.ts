import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StudentUtils {
  studentNumberIdExist(studentNumber: String): boolean{
    return studentNumber && studentNumber !== 'new';
  }

  getDateFieldsNames(): string[]{
    return ['birthDate', 'subscribeStart', 'subscribeEnd'];
  }
}