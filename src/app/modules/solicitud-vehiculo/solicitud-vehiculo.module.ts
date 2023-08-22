import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudVehiculoRoutingModule } from './solicitud-vehiculo-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import {UIModule} from "../../shared/ui/ui.module";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [
    ListarComponent,
    MisSolicitudesComponent
  ],
  imports: [
    CommonModule,
    SolicitudVehiculoRoutingModule,
    UIModule,
    FormsModule,
    NgxPaginationModule, // para paginar
    Ng2SearchPipeModule,
  ]
})
export class SolicitudVehiculoModule { }
