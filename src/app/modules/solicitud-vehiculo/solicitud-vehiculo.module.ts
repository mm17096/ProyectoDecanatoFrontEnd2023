import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudVehiculoRoutingModule } from './solicitud-vehiculo-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';


@NgModule({
  declarations: [
    ListarComponent,
    MisSolicitudesComponent
  ],
  imports: [
    CommonModule,
    SolicitudVehiculoRoutingModule
  ]
})
export class SolicitudVehiculoModule { }
