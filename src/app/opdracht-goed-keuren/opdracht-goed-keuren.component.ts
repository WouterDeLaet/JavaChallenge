import { Component, OnInit } from '@angular/core';
import {ApixuService} from '../services/apixu.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {Opdrachten} from '../interfaces/opdrachten';

@Component({
  selector: 'app-opdracht-goed-keuren',
  templateUrl: './opdracht-goed-keuren.component.html',
  styles: []
})
export class OpdrachtGoedKeurenComponent implements OnInit {

  user: User;
  opdrachten$: Opdrachten;

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
    const afgekeurd = this.apixuService.opdrachtAfkeuren(this.user.token, opdrachtId);
    afgekeurd.subscribe(data => {
      console.log(data);
    });
    this.ngOnInit();
  }

  puntenToekennen(opdrachtId, punten)
  {
    const goedGekeurd = this.apixuService.opdrachtIndienenMetPunten(this.user.token, opdrachtId, punten);
    goedGekeurd.subscribe(data => {
      console.log(data);
    });
    this.ngOnInit();
  }
}


