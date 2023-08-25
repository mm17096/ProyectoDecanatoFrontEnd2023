import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { ListarComponent } from './pages/listar/listar.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ModalComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    CargoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,

  ]
})
export class CargoModule { }
