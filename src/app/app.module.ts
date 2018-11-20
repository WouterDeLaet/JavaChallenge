import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgBootstrapModule} from './sharedModules/ng-bootstrap.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopModule } from './shop/shop.module';
import { PuntenModule } from './punten/punten.module';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';

import { RewardFormComponent } from './reward-form/reward-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { RewardFormModule } from './reward-form/reward-form.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RewardFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    ShopModule,
    PuntenModule,
    LoginModule,
    ErrorModule,
    HttpClientModule,
    RewardFormModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
