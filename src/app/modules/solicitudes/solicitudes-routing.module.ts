import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudvaleComponent } from './solicitudvale/solicitudvale.component';
import { SolicitudvComponent } from './solicitudv/solicitudv.component';
import { SolicitudValeAprobarComponent } from './solicitud-vale-aprobar/solicitud-vale-aprobar.component';

const routes: Routes = [
  {path:'solicitudvale',component:SolicitudvaleComponent},
  {path:'solicitudv',component:SolicitudvComponent},
  {path: 'solictud-aprobar', component:SolicitudValeAprobarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
