import { Injectable } from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TransactieService {

  readonly ROOT_URL = 'http://localhost:8081/transacties';

  constructor(private http: HttpClient) { }

  addTransactieForUser(data, user): Observable<any> {
    const nu = new Date();
    const body = new HttpParams()
      .set('userId', data.userId)
      .set('rewardId', data.rewardId)
      .set('aantalPunten', data.aantalPunten)
      .set('datum', nu.toDateString());

    return this.http.post(this.ROOT_URL, body.toString(), {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'x-access-token': user.token}})
      .pipe(
        tap(req => console.log('post-request', req)),
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
