import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public isCollapsed = true;
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

