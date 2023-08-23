import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarComponent} from "./pages/listar/listar.component";
import {MisSolicitudesComponent} from "./pages/mis-solicitudes/mis-solicitudes.component";

const routes: Routes = [
  {
    path: 'listado',
    component: ListarComponent,
  },
  {
    path: 'mis-solicitudes',
    component: MisSolicitudesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudVehiculoRoutingModule { }
