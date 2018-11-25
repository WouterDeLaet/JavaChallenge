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

  nieuweOpdrachtIndienen(token, data, userId, titel, opdrachtTypeId, aantalPunten) : Promise<any>{

    console.log("add");
    const body = new HttpParams()
      .set('titel',titel)
      .set('beschrijving', data.beschrijving)
      .set('datumInzending', data.datumInzending)
      .set('userId', userId)
      .set('opdrachtTypeId', opdrachtTypeId)
      .set('aantalPunten', aantalPunten)
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
      .set("isGoedgekeurd", "true")
      .set('datumGoedgekeurd', date.toDateString());
    return this.http.put(this.ROOT_URL + this.OPDRACHTEN + '/' + opdrachtId, body.toString() , {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'x-access-token': token}})
  }

  opdrachtIndienenMetPunten(token, opdrachtId, punten): Observable<any> {
    const date = new Date();
    const body = new HttpParams()
      .set("isGoedgekeurd", "true")
      .set("aantalPunten", punten)
      .set('datumGoedgekeurd', date.toDateString());
    return this.http.put(this.ROOT_URL + this.OPDRACHTEN + '/' + opdrachtId, body.toString() , {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'x-access-token': token}})
  }

  opdrachtAfkeuren(token, opdrachtId): Observable<any> {
    return this.http.delete(this.ROOT_URL + this.OPDRACHTEN + '/' + opdrachtId,  {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'x-access-token': token}});
  }

  opdrachtTypeBewerken(token, opdrachtTypeId, naam, aantalPunten): Observable<any> {
    const body = new HttpParams()
      .set('naam', naam)
      .set('aantalPunten', aantalPunten);
    return this.http.put(this.ROOT_URL + this.OPDRACHTTYPES + '/' + opdrachtTypeId, body.toString(), {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'x-access-token': token}});
  }

  opdrachtTypeToevoegen(token, naam, aantalPunten) : Promise<any>{
    console.log("add");
    const body = new HttpParams()
      .set('naam',naam)
      .set('aantalPunten', aantalPunten);
    return this.http.post(this.ROOT_URL + this.OPDRACHTTYPES, body.toString(), {headers: {'Content-Type' : 'application/x-www-form-urlencoded', 'x-access-token': token}})
      .toPromise()
      .then((opdrachten) => console.log(opdrachten))
      .catch((error) => {
        console.log(error);
        alert(error.message);
        return EMPTY;
      });
  }

  opdrachtTypeVerwijderen(token, opdrachtTypeId): Observable<any> {
    return this.http.delete(this.ROOT_URL + this.OPDRACHTTYPES + '/' + opdrachtTypeId,  {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'x-access-token': token}})
  }
}
