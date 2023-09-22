import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcercaDeAyudaRoutingModule } from './acerca-de-ayuda-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AcercadeComponent } from './acercade/acercade.component';
import { AyudaComponent } from './ayuda/ayuda.component';


@NgModule({
  declarations: [
    AcercadeComponent,
    AyudaComponent
  ],
  imports: [
    CommonModule,
    AcercaDeAyudaRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class AcercaDeAyudaModule { }
