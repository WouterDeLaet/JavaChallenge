import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reward-form',
  templateUrl: './reward-form.component.html',
  styles: []
})
export class RewardFormComponent implements OnInit {

  reward = {
    _id: '',
    naam: '',
    beschrijving: '',
    aantalPunten: '',
    fotoCode: '',
    datum: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
