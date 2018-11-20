import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { NgBootstrapModule } from '../sharedModules/ng-bootstrap.module';

@NgModule({
  imports: [
    CommonModule,
    NgBootstrapModule
  ],
  declarations: [ShopComponent]
})
export class ShopModule { }
