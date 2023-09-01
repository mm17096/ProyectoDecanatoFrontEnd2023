import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompraRoutingModule } from './compra-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ModalComponent,
    MostrarComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    CompraRoutingModule,
    FormsModule,
    UIModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ]
})
export class CompraModule { }
