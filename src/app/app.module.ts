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
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { PermissionComponent } from './permission/permission.component';
import { OpdrachtGoedKeurenModule } from './opdracht-goed-keuren/opdracht-goed-keuren.module';
import { OpdrachtToevoegenModule } from './opdracht-toevoegen/opdracht-toevoegen.module';
import { RewardLijstComponent } from './reward-lijst/reward-lijst.component';
import { RewardLijstModule } from './reward-lijst/reward-lijst.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RewardFormComponent,
    DashboardComponent,
    DashboardAdminComponent,
    PermissionComponent,
    RewardLijstComponent
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
    FormsModule,
    OpdrachtGoedKeurenModule,
    OpdrachtToevoegenModule,
    RewardLijstModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
