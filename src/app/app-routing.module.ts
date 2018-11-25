import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PuntenComponent} from './punten/punten.component';
import {ShopComponent} from './shop/shop.component';
import {ErrorComponent} from './error/error.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RewardFormComponent} from './reward-form/reward-form.component';
import {DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import {PermissionComponent} from './permission/permission.component';
import {OpdrachtGoedKeurenComponent} from './opdracht-goed-keuren/opdracht-goed-keuren.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {OpdrachtToevoegenComponent} from './opdracht-toevoegen/opdracht-toevoegen.component';
import {RewardLijstComponent} from './reward-lijst/reward-lijst.component';

const routes: Routes = [

  {path: '403', component: PermissionComponent},
  {path: '404', component: ErrorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'opdracht-registeren', component: PuntenComponent, canActivate: [AuthGuard]},
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuard]},
  {path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AdminGuard]},
  {path: 'opdracht-goedkeuren', component: OpdrachtGoedKeurenComponent, canActivate: [AdminGuard]},
  {path: 'opdracht-beheren', component: OpdrachtToevoegenComponent, canActivate: [AdminGuard]},
  {path: 'reward-form', component: RewardFormComponent, canActivate: [AdminGuard]},
  {path: 'reward-lijst', component: RewardLijstComponent, canActivate: [AdminGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: '404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
