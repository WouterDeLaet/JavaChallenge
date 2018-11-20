import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( data =>
      {
        this.user = data
      }
      );
  }
}
