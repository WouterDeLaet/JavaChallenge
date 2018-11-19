import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntenComponent } from './punten.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PuntenComponent]
})
export class PuntenModule { }
