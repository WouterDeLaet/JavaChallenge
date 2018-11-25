import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntenComponent } from './punten.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [PuntenComponent]
})
export class PuntenModule { }
