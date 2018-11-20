import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {RewardService} from '../services/reward.service';


@Component({
  selector: 'app-reward-form',
  templateUrl: './reward-form.component.html',
  styles: []
})
export class RewardFormComponent implements OnInit {

  user: User;

  reward = {
    _id: '',
    naam: '',
    beschrijving: '',
    aantalPunten: '',
    fotoCode: '',
    datum: ''
  };

  constructor(private authService: AuthService, private rewardService: RewardService ) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.user = data);
  }


  // Jens Sels - Toevoegen of bewerken van reward
  commitReward() {
    if (this.user != null && this.reward != null) {
      if (this.reward._id == null) {
        this.rewardService.addReward(this.reward, this.user).subscribe(
          data => {
            console.log(data);
          }
        );
      } else {
        this.rewardService.editReward(this.reward, this.user).subscribe(
          data => console.log(data)
        );
      }
    }
  }

}
