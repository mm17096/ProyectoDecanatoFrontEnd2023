import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudvComponent } from './solicitudv/solicitudv.component';
import { SolicitudvaleComponent } from './solicitudvale/solicitudvale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SolicitudvComponent,
    SolicitudvaleComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class SolicitudesModule { }
