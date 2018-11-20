import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-punten',
  templateUrl: './punten.component.html',
  styles: []
})
export class PuntenComponent implements OnInit {

  opdrachten = [{
    id: '1',
    titel: 'Blogpost schrijven',
    punten: '1'
  },
  {
    id: '2',
    titel: 'Nieuwe technologie onderzoeken',
    punten: '10'
  },
  {
    id: '3',
    titel: 'Bijwonen van een conferentie ',
    punten: '8'
  }];

  opdracht = {
    opdracht: '',
    titel: '',
    beschrijving: 'Beschrijving',
    datum: ''
  };

  constructor() { }

  ngOnInit() {
  }

  addOpdracht(form) {
    console.log('submitted form:', form);
  }

}

