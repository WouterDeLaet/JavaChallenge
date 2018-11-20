import { Component, OnInit } from '@angular/core';
import {ApixuService} from '../services/apixu.service';
import {OpdrachtTypes} from '../interfaces/opdracht-types';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {Opdrachten} from '../interfaces/opdrachten';
import {Token} from '../interfaces/token';

@Component({
  selector: 'app-punten',
  templateUrl: './punten.component.html',
  styles: []
})
export class PuntenComponent implements OnInit {

  opdrachtTypes: OpdrachtTypes;
  user: User;
  opdrachten: Opdrachten;

  constructor(private apixuService: ApixuService, private authService: AuthService) { }

  ngOnInit() {
    const opdrachten$ = this.apixuService.getOpdrachten(this.user.token);
    opdrachten$.subscribe(data => {
      console.log(data);
      this.opdrachtTypes = data;
    });

    this.authService.userData$.subscribe( data =>
      {
        this.user = data
      }
    );
  }

  addOpdracht(form) {
    console.log('submitted form:', form);
  }

}

