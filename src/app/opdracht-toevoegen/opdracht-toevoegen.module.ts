import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdrachtToevoegenComponent } from './opdracht-toevoegen.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [OpdrachtToevoegenComponent]
})
export class OpdrachtToevoegenModule { }
