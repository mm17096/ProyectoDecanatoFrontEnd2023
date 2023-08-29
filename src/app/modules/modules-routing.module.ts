import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../core/guards/auth.guard";

const routes: Routes = [
  { path: 'solicitud-vehiculo', loadChildren: () => import('./solicitud-vehiculo/solicitud-vehiculo.module').then(m => m.SolicitudVehiculoModule), canActivate: [AuthGuard]}, //  canActivateChild: [AuthChildGuard]

  { path: 'asignacionVale', loadChildren: () => import('./asignacion-vales/asignacion-vales.module').then(m => m.AsignacionValesModule), canActivate: [AuthGuard] },

  { path: 'compra',  loadChildren: () => import('./compra/compra.module').then(m => m.CompraModule) },
  { path: 'proveedor', loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
  //Ruta de empleado //
  { path: 'empleados', loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
