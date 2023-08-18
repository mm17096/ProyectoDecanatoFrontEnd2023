import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AsignacionValesRoutingModule } from './asignacion-vales-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AsignacionValesRoutingModule,
    FormsModule,
    UIModule,
    Ng2SearchPipeModule
  ]
})
export class AsignacionValesModule { }
