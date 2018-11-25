import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {Reward} from '../interfaces/reward';
import {RewardService} from '../services/reward.service';

@Component({
  selector: 'app-rewards-beheren',
  templateUrl: './rewards-beheren.component.html',
  styleUrls: ['./rewards-beheren.component.scss']
})
export class RewardsBeherenComponent implements OnInit {

  user: User;
  reward: Reward;

  constructor(private rewardService: RewardService, private authService: AuthService) { }

  ngOnInit() {

    this.authService.userData$.subscribe( data =>
      {
        this.user = data
      }
    );

  }

}
