import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
