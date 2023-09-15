import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncabezadoComponent } from './pages/encabezado/encabezado.component';

const routes: Routes = [{path: 'asignacion/:codigoAsignacion', component:EncabezadoComponent  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionValesRoutingModule { }
