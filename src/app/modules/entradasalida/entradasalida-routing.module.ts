import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaentradasalidaComponent } from './pages/vistaentradasalida/vistaentradasalida.component';

const routes: Routes = [
  {path:'vista_es', component: VistaentradasalidaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasalidaRoutingModule { }
