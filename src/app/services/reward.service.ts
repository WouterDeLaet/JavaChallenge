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

  getRewards(user): Observable<any> {
    return this.http.get(this.ROOT_URL, {headers: {'x-access-token': user.token}})
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

  getReward(user, id): Observable<any> {
    return this.http.get(this.ROOT_URL + '/' + id, {headers: {'x-access-token': user.token}})
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

  addReward(data, user): Observable<any> {
    console.log('add');
    const nu = new Date();
    const body = new HttpParams()
      .set('naam', data.naam)
      .set('beschrijving', data.beschrijving)
      .set('aantalPunten', data.aantalPunten)
      .set('fotoCode', data.fotoCode)
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

  editReward(data, user): Observable<any> {
    console.log('edit');
    const body = new HttpParams()
      .set('naam', data.naam)
      .set('beschrijving', data.beschrijving)
      .set('aantalPunten', data.aantalPunten)
      .set('fotoCode', data.fotoCode)
      .set('datum', data.datum);

    return this.http.put(this.ROOT_URL + '/' + data._id, body.toString(), {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
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
