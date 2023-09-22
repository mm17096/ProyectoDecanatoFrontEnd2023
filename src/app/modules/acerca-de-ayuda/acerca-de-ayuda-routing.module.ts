import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercadeComponent } from './acercade/acercade.component';
import { AyudaComponent } from './ayuda/ayuda.component';

const routes: Routes = [
  {path:'acercade',component:AcercadeComponent},
  {path:'ayuda',component:AyudaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcercaDeAyudaRoutingModule { }
