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
    const verwijderd = this.apixuService.opdrachtTypeVerwijderen(this.user.token, opdrachtTypeId);
    verwijderd.subscribe(data => {
      console.log(data);
    });

    this.ngOnInit();
  }

  opdrachtTypeBewerke(opdrachtTypeId, naam, aantalPunten)
  {
    const opdrachtTypeBewerkt = this.apixuService.opdrachtTypeBewerken(this.user.token, opdrachtTypeId, naam, aantalPunten);
    opdrachtTypeBewerkt.subscribe(data => {
      console.log(data);
    });
    this.ngOnInit();
  }

  opdrachtTypeToevoegen(naam, aantalPunten)
  {
    console.log("submitted data from form: " + naam + ' ' + aantalPunten);
    this.apixuService.opdrachtTypeToevoegen(this.user.token, naam, aantalPunten);
    this.ngOnInit();
  }
}
