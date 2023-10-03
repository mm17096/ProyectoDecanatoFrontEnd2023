import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { DeptoRoutingModule } from './depto-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { ModalComponent } from './components/modal/modal.component';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    ListarComponent,
    ModalComponent,

  ],
  imports: [
    CommonModule,
    DeptoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,

  ]
})
export class DeptoModule { }
