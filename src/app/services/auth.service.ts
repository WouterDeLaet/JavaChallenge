import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';
import {ApixuService} from './apixu.service';
import {catchError, share, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {finalize} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usr$ = new Observable();
  private loggedIn = new BehaviorSubject<boolean>(false);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);
  userArray: any;

  constructor(private router: Router, private apixu: ApixuService, private http: HttpClient) {
    if (localStorage.getItem('user')) {
      console.log(JSON.parse(localStorage.getItem('user')));
      const json = JSON.parse(localStorage.getItem('user'));
      this.setUserData(json.user, json.token);
    }
  }

  login(data: any) {
    // if(data.email == email uit de data base && data.password == password uit de database)

    this.usr$ = this.apixu.postLogin(data);
    this.usr$.subscribe(value => {
        if (value != null) {
          this.userArray = value;
          this.loggedIn.next(true);
          this.setUserData(this.userArray.user, this.userArray.token);
          localStorage.setItem('user', JSON.stringify(value));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Fout email of wachtwoord.');
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.setUserData(null, null);
    window.location.reload();
  }

  setUserData(user, token) {
    if (user !== null) {
      this.userData$.next({
        email: user.email,
        naam: user.naam,
        wachtwoord: user.wachtwoord,
        adminNiveau: user.adminNiveau,
        _id: user._id,
        token: token,
      });
    } else {
      this.userData$.next(null);
    }
  }


  getTransactiesForUser(user): Observable<any> {
    return this.http.get('http://localhost:8081/users/' + user._id + '/transacties',
      {headers: {'Content-Type' : 'application/x-www-form-urlencoded',
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

  getGoedgekeurdeOpdrachtenForUser(user): Observable<any> {
    const body = new HttpParams()
      .set('isGoedgekeurd', 'true');
    return this.http.get('http://localhost:8081/users/' + user._id + '/opdrachten' , {headers: {'x-access-token': user.token}, params: body})
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
  getOpdrachtenForUser(user): Observable<any> {
    return this.http.get('http://localhost:8081/users/' + user._id + '/opdrachten' , {headers: {'x-access-token': user.token}})
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
