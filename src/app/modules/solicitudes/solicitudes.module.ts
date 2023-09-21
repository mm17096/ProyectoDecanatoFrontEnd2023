import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SolicitudesRoutingModule } from "./solicitudes-routing.module";
import { SolicitudvComponent } from "./solicitudv/solicitudv.component";
import { SolicitudvaleComponent } from "./solicitudvale/solicitudvale.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { UIModule } from "../../shared/ui/ui.module";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudValeAprobarComponent } from './solicitud-vale-aprobar/solicitud-vale-aprobar.component';

@NgModule({
  declarations: [SolicitudvComponent, SolicitudvaleComponent, SolicitudValeAprobarComponent],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    UIModule,
    NgbTooltipModule,
  ],
})
export class SolicitudesModule {}
