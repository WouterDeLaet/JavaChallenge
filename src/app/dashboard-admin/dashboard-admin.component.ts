import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  user: User;
  rewards: Reward;

  constructor(public authService: AuthService, public rewardService: RewardService, private router: Router ) { }

  ngOnInit() {

    // Jolien Lauwers - Nakijken van adminNiveau voor permissie

    this.authService.userData$.subscribe(user => {

      if (this.authService.userData$.value.adminNiveau.toString() != '1') {
        this.router.navigate(['403']);
      } else {

      }

      this.rewardService.getRewards(user).subscribe(result => {
        this.rewards = result;
      });
    });
  }

}
