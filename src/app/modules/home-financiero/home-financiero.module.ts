import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeFinancieroRoutingModule } from './home-financiero-routing.module';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ModalCompraComponent } from './components/modal-compra/modal-compra.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    MostrarComponent,
    ModalCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeFinancieroRoutingModule,
    UIModule,
    WidgetModule,
    NgApexchartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    LayoutsModule
  ], providers: [
    DatePipe
  ]
})
export class HomeFinancieroModule { }
