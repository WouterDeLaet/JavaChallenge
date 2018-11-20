import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit {

  user: User;
  test: any;

  rewards = [{
    id: '1',
    naam: 'Een bak Cara Pils',
    punten: '10'
  },
  {
    id: '2',
    naam: 'Oculus Rift',
    punten: '500'
  }];

  constructor(public authService: AuthService, public rewardService: RewardService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( data => this.user = data);
    this.test = localStorage.getItem('user');

    const rewardData$ = this.rewardService.getReward(); // query
    rewardData$.subscribe(data => {
      console.log(data);
      this.rewards = data;
    });
  }

}
