import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';
import {TransactieService} from '../services/transactie.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  status = '';
  @ViewChild('content') private contentModal;
  public isCollapsed = true;
  user: User;
  rewards: Reward;
  currentReward: Reward;

  constructor(public authService: AuthService, public rewardService: RewardService,
              public transactieService: TransactieService, private modalService: NgbModal) { }

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.user = user;
      this.rewardService.getRewards(user).subscribe(result => {
        this.rewards = result;
      });
    });
  }

  rewardBevestigen(rewardIndex) {
    this.status = '';
    this.currentReward = this.rewards[rewardIndex];
    this.openModal();
  }

  rewardKopen() {
    if (this.user != null && this.currentReward != null) {
      this.status = 'Loading';
      const newTransactie = {'userId': this.user._id, 'rewardId': this.currentReward._id, 'aantalPunten': this.currentReward.aantalPunten };
      this.transactieService.addTransactieForUser(newTransactie, this.user).subscribe(result => {
        this.status = 'Success';
      });
    }
  }

  openModal() {
    console.log(this.status);
    this.modalService.open(this.contentModal , {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(reason);
    });
  }
}

