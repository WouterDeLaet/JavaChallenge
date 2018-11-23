import { Component, OnInit } from '@angular/core';
import {ApixuService} from '../services/apixu.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {Opdrachten} from '../interfaces/opdrachten';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-opdracht-goed-keuren',
  templateUrl: './opdracht-goed-keuren.component.html',
  styles: []
})
export class OpdrachtGoedKeurenComponent implements OnInit {

  user: User;
  opdrachten$: Opdrachten;
  userById: User;

  constructor(private apixuService: ApixuService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( data =>
      {
        this.user = data
      }
    );
    const opdrachten$ = this.apixuService.getOpdrachten(this.user.token, false);
    opdrachten$.subscribe(data => {
      console.log(data);
      this.opdrachten$ = data;
    });
  }

  opdrachtGoedkeuren(opdrachtId, userId, aantalPunten)
  {
    const goedGekeurd = this.apixuService.opdrachtIndienen(this.user.token, opdrachtId);
    goedGekeurd.subscribe(data => {
      console.log(data);
    })
  }

  getUSerById(userId)
  {
    const userById$ = this.apixuService.getOpdrachten(this.user.token, false);
    userById$.subscribe(data => {
      console.log(data);
      this.userById = data;
    });
  }
}


