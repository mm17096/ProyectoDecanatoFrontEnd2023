import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudvaleComponent } from './solicitudvale/solicitudvale.component';
import { SolicitudvComponent } from './solicitudv/solicitudv.component';

import { SolicitanteComponent } from './solicitante/solicitante.component';

import { SolicitudValeAprobarComponent } from './solicitud-vale-aprobar/solicitud-vale-aprobar.component';
import { MovimientosvalesComponent } from './movimientosvales/movimientosvales.component';


const routes: Routes = [
  {path:'solicitudvale',component:SolicitudvaleComponent},
  {path:'solicitudv',component:SolicitudvComponent},
  {path:'movimientosvales',component:MovimientosvalesComponent},
  {path:'solicitante',component:SolicitanteComponent},
  {path: 'solictud-aprobar', component:SolicitudValeAprobarComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
