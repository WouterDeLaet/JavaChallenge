import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';
import {ApixuService} from './apixu.service';
import {Token} from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usr$ = new Observable();
  private loggedIn = new BehaviorSubject<boolean>(false);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);
  tokenData$: BehaviorSubject<Token> = new BehaviorSubject(null);

  constructor(private router: Router, private apixu: ApixuService) {
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
          this.loggedIn.next(true);
          this.setUserData(value.user, value.token);
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
    this.router.navigate(['/login']);
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
}
