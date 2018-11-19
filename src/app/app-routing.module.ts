import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PuntenComponent} from './punten/punten.component';
import {ShopComponent} from './shop/shop.component';
import {ErrorComponent} from './error/error.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'punten', component: PuntenComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: '**', redirectTo: 'error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
