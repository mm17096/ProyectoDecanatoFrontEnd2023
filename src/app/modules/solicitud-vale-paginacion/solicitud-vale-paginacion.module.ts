import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudValePaginacionRoutingModule } from './solicitud-vale-paginacion-routing.module';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [
    MostrarComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    SolicitudValePaginacionRoutingModule,
    FormsModule,
    UIModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class SolicitudValePaginacionModule { }
