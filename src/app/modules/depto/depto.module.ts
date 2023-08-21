import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeptoRoutingModule } from './depto-routing.module';
import { ListarComponent } from './listar/listar.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    ListarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    DeptoRoutingModule
  ]
})
export class DeptoModule { }
