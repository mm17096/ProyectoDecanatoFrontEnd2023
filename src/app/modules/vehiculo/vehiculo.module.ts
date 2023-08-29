import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [
    ListarComponent,
    TablaComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule
  ]
})
export class VehiculoModule { }
