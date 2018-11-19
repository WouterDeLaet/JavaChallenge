import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit {
  user: User;
  test: any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( data => this.user = data);
    this.test = localStorage.getItem('user');
  }

}
