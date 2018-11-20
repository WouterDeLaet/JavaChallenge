import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RewardService {

  readonly ROOT_URL = 'http://localhost:8081/rewards';

  constructor(private http: HttpClient) { }

  getReward(): Observable<any> {

    return this.http.get(this.ROOT_URL + '/?orderBy=datum&orderDirection=ASC')
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
