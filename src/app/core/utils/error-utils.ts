import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorUtils{

    public returnErrorIfConnectionFailed(router: Router) {
        return catchError(error => {
            if(error.status == 401){
                alert('You have to log first')
                router.navigate(['/login']);
            }
            return throwError(() => new Error(error))
        })
    }

    public returnErrorIfBadLoginOrPwd() {
        return catchError(error => {
            alert('Bad login or password')
            return throwError(() => new Error(error))
        })
    }
}