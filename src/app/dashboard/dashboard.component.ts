import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  rewards: Reward;

  constructor(public authService: AuthService, public rewardService: RewardService) { }

  ngOnInit() {

    const rewardData$ = this.rewardService.getReward(); // query
    rewardData$.subscribe(data => {
      console.log(data);
      this.rewards = data;
    });
  }
}
