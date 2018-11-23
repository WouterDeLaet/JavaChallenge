import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  user: User;
  rewards: Reward;

  constructor(public authService: AuthService, public rewardService: RewardService) { }

  ngOnInit() {

    this.authService.userData$.subscribe(user => {
      this.rewardService.getRewards(user).subscribe(result => {
        this.rewards = result;
      });
    });
  }

}
