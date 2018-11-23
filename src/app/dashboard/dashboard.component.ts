import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  rewards: Reward;

  constructor(public authService: AuthService, public rewardService: RewardService, private router: Router) { }

  ngOnInit() {

    this.authService.userData$.subscribe(user => {

        this.rewardService.getRewards(user).subscribe(result => {
        this.rewards = result;
        console.log(result);

      });

    });
  }
}
