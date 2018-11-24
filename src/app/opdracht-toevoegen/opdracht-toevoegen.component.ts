import { Component, OnInit } from '@angular/core';
import {ApixuService} from '../services/apixu.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {OpdrachtTypes} from '../interfaces/opdracht-types';

@Component({
  selector: 'app-opdracht-toevoegen',
  templateUrl: './opdracht-toevoegen.component.html',
  styles: []
})
export class OpdrachtToevoegenComponent implements OnInit {

  user: User;
  opdrachtTypes: OpdrachtTypes;
  opdrachtTypeForm = {
    naam: '',
    aantalPunten: '',
  };

  constructor(private apixuService: ApixuService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( data =>
      {
        this.user = data
      }
    );

    const opdrachtenType$ = this.apixuService.getOpdrachtTypese(this.user.token);
    opdrachtenType$.subscribe(data => {
      console.log(data);
      this.opdrachtTypes = data;
    });
  }

  opdrachtTypeVerwijderen(opdrachtTypeId)
  {

  }

  opdrachtTypeBewerke(opdrachtTypeId, naam, aantalPunten)
  {
    const opdrachtTypeBewerkt = this.apixuService.opdrachtTypeBewerken(this.user.token, opdrachtTypeId, naam, aantalPunten);
    opdrachtTypeBewerkt.subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

  opdrachtTypeToevoegen(form)
  {
    console.log("submitted data from form: " + form.naam + ' ' + form.aantalPunten);
  }
}
