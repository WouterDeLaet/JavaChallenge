import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';
import {ApixuService} from './apixu.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usr$ = new Observable();
  private loggedIn = new BehaviorSubject<boolean>(false);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private apixu: ApixuService) {
  }

  login(data: any, isValid: string) {
    //if(data.email == email uit de data base && data.password == password uit de database)

    this.usr$ = this.apixu.postLogin(data);
    this.usr$.subscribe(value => {
        if (value != null) {
          this.loggedIn.next(true);
          this.setUserData(value);
          localStorage.setItem('user', JSON.stringify(value));
          this.router.navigate(['/shop']);
        }
        else {
          alert('Fout email of wachtwoord.');
        }
      });
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  setUserData(user) {
    if (user !== null) {
      this.userData$.next({
        wachtwoord: user.wachtwoord,
        email: user.email,
        naam: user.naam,
        _id: user._id,
        adminNiveau: user.adminNiveau
      });
    } else {
      this.userData$.next(null);
    }
  }
}
