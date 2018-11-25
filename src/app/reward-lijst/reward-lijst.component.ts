import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';
import {User} from '../interfaces/user';
import {Reward} from '../interfaces/reward';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reward-lijst',
  templateUrl: './reward-lijst.component.html',
  styles: []
})
export class RewardLijstComponent implements OnInit {
  status = '';
  user: User;
  rewards: Reward[];
  currentReward: Reward;
  @ViewChild('content') private contentModal;

  constructor(private authService: AuthService, private rewardService: RewardService,
              private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.user = user;
      this.rewardService.getRewards(this.user).subscribe(rewards => {
        this.rewards = rewards;
      });
    });
  }

  // Jens Sels - Openen van pagina voor het toevoegen van een nieuwe reward
  openAddPage() {
    this.router.navigate(['reward-form']);
  }
  // Jens Sels - Openen van bewerk pagina voor een reward
  openEditPage(rewardUID) {
    this.router.navigate(['reward-form'], { queryParams: { id: rewardUID } });
  }

  // Jens Sels - Openen van modal waarmee een reward kan worden verwijderd
  openDeleteModal(rewardIndex) {
    this.status = '';
    this.currentReward = this.rewards[rewardIndex];
    this.modalService.open(this.contentModal).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(reason);
    });
  }

  // Jens Sels - Deleten van een reward
  deleteReward() {
    if (this.currentReward != null) {
      this.rewardService.deleteReward(this.currentReward._id, this.user).subscribe(data => {
        this.status = 'done';
        this.rewardService.getRewards(this.user).subscribe(rewards => {
          this.rewards = [];
          this.rewards = rewards;
        });
      });
    }
  }

}
