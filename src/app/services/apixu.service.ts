import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  readonly ROOT_URL = 'http://localhost:8081/users/login';

  constructor(private http: HttpClient) {
  }

  postLogin(data): Observable<any> {
    const body = new HttpParams()
      .set('email', data.email)
      .set('wachtwoord', data.password);
    return this.http.post(this.ROOT_URL, body.toString(), {headers: {'Content-Type' : 'application/x-www-form-urlencoded'}})
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError(
          (error) => {
            console.log(error);
            alert(error.message);
            return EMPTY;
          }),
        share()
      );
  }
}
