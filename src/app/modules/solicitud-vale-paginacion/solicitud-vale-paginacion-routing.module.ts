import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './pages/mostrar/mostrar.component';

const routes: Routes = [{ path:'paginado', component: MostrarComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudValePaginacionRoutingModule { }
