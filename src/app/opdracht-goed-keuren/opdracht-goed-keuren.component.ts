import { Component, OnInit } from '@angular/core';
import {ApixuService} from '../services/apixu.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {Opdrachten} from '../interfaces/opdrachten';
import {element} from 'protractor';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-opdracht-goed-keuren',
  templateUrl: './opdracht-goed-keuren.component.html',
  styles: []
})
export class OpdrachtGoedKeurenComponent implements OnInit {

  user: User;
  opdrachten$: Opdrachten;
  userbyId$ = {
    email: '',
    wachtwoord: '',
    naam: '',
    adminNiveau: '',
    _id: '',
    token: '',
  };

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
      data.forEach(element => {
        this.getUserById(element.userId);
      });
    });
  }

  opdrachtGoedkeuren(opdrachtId)
  {
      const goedGekeurd = this.apixuService.opdrachtIndienen(this.user.token, opdrachtId);
      goedGekeurd.subscribe(data => {
        console.log(data);
      });
      this.ngOnInit();
  }

  opdrachtAfkeuren(opdrachtId)
  {
    let beslissing = confirm("Weet je zeker dat je deze opdracht wil afkeuren?");
    if(beslissing == true)
    {
      const afgekeurd = this.apixuService.opdrachtAfkeuren(this.user.token, opdrachtId);
      afgekeurd.subscribe(data => {
        console.log(data);
      });
      this.ngOnInit();
    }
  }

  puntenToekennen(opdrachtId, punten)
  {
    console.log(punten);
      const goedGekeurd = this.apixuService.opdrachtIndienenMetPunten(this.user.token, opdrachtId, punten);
      goedGekeurd.subscribe(data => {
        console.log(data);
      });
      this.ngOnInit();
  }

  getUserById(userId)
  {
    const user$ = this.apixuService.getUserById(this.user.token, userId);
    user$.subscribe(data => {
      this.userbyId$ = data;
    });
  }
}


