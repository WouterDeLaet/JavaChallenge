import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.loginData = JSON.parse(localStorage.getItem('user'));
    }
  }

  login(data: any, isValid: string) {
    if (isValid) {
      this.authService.login(data);
    }
    else {
      alert('Het email of password is niet juist');
    }
  }
}
