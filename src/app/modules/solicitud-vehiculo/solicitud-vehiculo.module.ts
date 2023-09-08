import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudVehiculoRoutingModule } from './solicitud-vehiculo-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import {UIModule} from "../../shared/ui/ui.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { ModalComponent } from './components/modal/modal.component';
import { TablaComponent } from './components/tabla/tabla.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbActiveModal, NgbModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    ListarComponent,
    MisSolicitudesComponent,
    ModalComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    SolicitudVehiculoRoutingModule,
    UIModule,
    FormsModule,
    NgxPaginationModule, // para paginar
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    NgbModule,
  ],
  providers: [NgbActiveModal],
})
export class SolicitudVehiculoModule { }
