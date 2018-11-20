import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit {
  email : any;
  constructor() { }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    alert(this.email);
  }

}
