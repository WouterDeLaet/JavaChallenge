import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PuntenComponent} from './punten/punten.component';
import {ShopComponent} from './shop/shop.component';
import {ErrorComponent} from './error/error.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RewardFormComponent} from './reward-form/reward-form.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import {PermissionComponent} from './permission/permission.component';
import {OpdrachtGoedKeurenComponent} from './opdracht-goed-keuren/opdracht-goed-keuren.component';

const routes: Routes = [
  {path: 'punten', component: PuntenComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'login', component: LoginComponent},
  {path: '403', component: PermissionComponent},
  {path: '404', component: ErrorComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboardadmin', component: DashboardAdminComponent},
  {path: 'rewardForm', component: RewardFormComponent},
  {path: 'opdracht_goed_keuren', component: OpdrachtGoedKeurenComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: '404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
