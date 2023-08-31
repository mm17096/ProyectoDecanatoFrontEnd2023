import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListardocumentovaleComponent } from './pages/listardocumentovale/listardocumentovale.component';


const routes: Routes = [
  {path:'vale', component:ListardocumentovaleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentosolcitudValeRoutingModule { }
