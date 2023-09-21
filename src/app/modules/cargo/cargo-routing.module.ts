import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/listar/listar.component';
import { AuthSecretariaGuard } from 'src/app/core/guards/auth-secretaria.guard';

const routes: Routes = [ { path: 'listar', component: ListarComponent,canActivate:[AuthSecretariaGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoRoutingModule { }
