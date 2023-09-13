import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolucionValeRoutingModule } from './devolucion-vale-routing.module';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TablaComponent } from './pages/tabla/tabla.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    MostrarComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    DevolucionValeRoutingModule,
    FormsModule,
    UIModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule
  ]
})
export class DevolucionValeModule { }
