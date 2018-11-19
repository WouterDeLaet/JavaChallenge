import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams()
      .set('email', data.email)
      .set('wachtwoord', data.password);

    return this.http.post(this.ROOT_URL, {params})
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
