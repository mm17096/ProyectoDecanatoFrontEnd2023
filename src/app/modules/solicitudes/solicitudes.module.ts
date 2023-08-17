import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudvComponent } from './solicitudv/solicitudv.component';
import { SolicitudvaleComponent } from './solicitudvale/solicitudvale.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SolicitudvComponent,
    SolicitudvaleComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    FormsModule
  ]
})
export class SolicitudesModule { }
