import {Observable, of} from 'rxjs';


export class AuthrMockService {

  isAuthTokenCorrect(token: String): Observable<Object> {
    return of();
  }
}
