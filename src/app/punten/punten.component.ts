import { Component, OnInit } from '@angular/core';
import {ApixuService} from '../services/apixu.service';
import {OpdrachtTypes} from '../interfaces/opdracht-types';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';
import {Opdrachten} from '../interfaces/opdrachten';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-punten',
  templateUrl: './punten.component.html',
  styles: []
})
export class PuntenComponent implements OnInit {

  opdrachtTypes: OpdrachtTypes;
  user: User;
  opdrachten = {
    _id: '',
  titel: '',
  beschrijving: '',
  datumInzending: '',
  userId: '',
  opdrachtTypeId: '',
  aantalPunten: '',
  isGoedgekeurd: '',
  datumGoedgekeurd: '',
  };

  test: Observable<any>;

  constructor(private apixuService: ApixuService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( data => {
        this.user = data;
      }
    );
    const opdrachtenType$ = this.apixuService.getOpdrachtTypese(this.user.token);
    opdrachtenType$.subscribe(data => {
      console.log(data);
      this.opdrachtTypes = data;
    });

    const opdrachten$ = this.apixuService.getOpdrachten(this.user.token, false);
    opdrachten$.subscribe(data => {
      console.log(data);
      this.test = data;
    });
  }

  addOpdracht(form, userId) {
    var titel;
    var opdrachtTypeId;
    var aantalPunten;

    console.log('submitted form:', form);
    console.log('submitted titel:', form.titel);
    console.log('submitted userId:', userId);
    if(form.titel == "andere")
    {
      titel = "andere";
      opdrachtTypeId = "/";
      aantalPunten = "Nog te bespreken";
    }
    else
    {
      titel = form.titel.naam;
      opdrachtTypeId = form.titel._id;
      aantalPunten = form.titel.aantalPunten;
    }
    this.apixuService.nieuweOpdrachtIndienen(this.user.token, form, userId, titel, opdrachtTypeId, aantalPunten);
  }

}

