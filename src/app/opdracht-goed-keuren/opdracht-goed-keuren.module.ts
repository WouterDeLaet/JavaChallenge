import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdrachtGoedKeurenComponent } from './opdracht-goed-keuren.component';
import { RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [OpdrachtGoedKeurenComponent]
})
export class OpdrachtGoedKeurenModule { }
