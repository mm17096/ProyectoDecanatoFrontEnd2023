import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AsignacionValesRoutingModule } from './asignacion-vales-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AsignacionValesRoutingModule,
    FormsModule,
    UIModule,
    NgbPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class AsignacionValesModule { }
