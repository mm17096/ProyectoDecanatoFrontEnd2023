import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    ListarComponent,
    TablaComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class VehiculoModule { }
