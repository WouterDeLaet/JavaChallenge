import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  readonly ROOT_URL = 'http://localhost:8081/';
  readonly LOGIN_USER = 'users/login';
  readonly USER = 'users';
  readonly OPDRACHTTYPES = 'opdrachtTypes';
  readonly OPDRACHTEN = 'opdrachten';

  constructor(private http: HttpClient) {
  }

  postLogin(data): Observable<any> {
    const body = new HttpParams()
      .set('email', data.email)
      .set('wachtwoord', data.password);
    return this.http.post(this.ROOT_URL + this.LOGIN_USER, body.toString(), {headers: {'Content-Type' : 'application/x-www-form-urlencoded'}})
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

  getUser(token, userId): Observable<any> {
    const body = new HttpParams()
      .set('ID', userId);
    return this.http.get(this.ROOT_URL + this.USER, {headers: {'x-access-token' : token}, params: body})
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

  getOpdrachtTypese(token): Observable<any> {
    return this.http.get(this.ROOT_URL + this.OPDRACHTTYPES, {headers: {'x-access-token' : token}})
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

  nieuweOpdrachtIndienen(token, data, userId) : Promise<any>{
    console.log("add");
    const body = new HttpParams()
      .set('titel', data.titel.naam)
      .set('beschrijving', data.beschrijving)
      .set('datumInzending', data.datumInzending)
      .set('userId', userId)
      .set('opdrachtTypeId', data.titel._id)
      .set('aantalPunten', data.titel.aantalPunten)
      .set('isGoedgekeurd', "false")
      .set('datumGoedgekeurd', "");
    return this.http.post(this.ROOT_URL + this.OPDRACHTEN, body.toString(), {headers: {'Content-Type' : 'application/x-www-form-urlencoded', 'x-access-token': token}})
      .toPromise()
      .then((opdrachten) => console.log(opdrachten))
      .catch((error) => {
        console.log(error);
        alert(error.message);
        return EMPTY;
      });
  }

  getOpdrachten(token, isGoedGekeurd): Observable<any>
  {
    const body = new HttpParams()
      .set('isGoedgekeurd', isGoedGekeurd);
    return this.http.get(this.ROOT_URL + this.OPDRACHTEN,{headers: {'x-access-token' : token}, params: body})
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

  opdrachtIndienen(token, opdrachtId): Observable<any> {
    const date = new Date();
    const body = new HttpParams()
      .set('isGoedgekeurd', "true")
      .set('datumGoedgekeurd', date.toDateString());
    return this.http.put(this.ROOT_URL + this.OPDRACHTEN + '/' + opdrachtId, body.toString() , {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'x-access-token': token}})
  }
}
