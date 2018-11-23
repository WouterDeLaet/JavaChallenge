import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {RewardService} from '../services/reward.service';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/internal/operators';


@Component({
  selector: 'app-reward-form',
  templateUrl: './reward-form.component.html',
  styles: []
})
export class RewardFormComponent implements OnInit {

  user: User;

  loading = true;

  reward = {
    _id: '',
    naam: '',
    beschrijving: '',
    aantalPunten: '',
    fotoCode: '',
    datum: ''
  };

  constructor(private authService: AuthService, private rewardService: RewardService,
              private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => {
      this.user = data;
      this.route.queryParams.subscribe(params => {
        const id = params['id'] || 0;
        console.log(id);
        if (id !== 0) {
          this.rewardService.getReward(this.user, id).subscribe( result => {
            this.reward = result;
            this.loading = false;
            }
          );
        } else {
          this.loading = false;
        }
      });
    });
  }


  // Jens Sels - Toevoegen of bewerken van reward
  commitReward(isValid: any) {
    if (this.user != null && isValid) {
      if (this.reward._id === '') {
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
