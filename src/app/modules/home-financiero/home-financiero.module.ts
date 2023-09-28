import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeFinancieroRoutingModule } from './home-financiero-routing.module';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';


@NgModule({
  declarations: [
    MostrarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeFinancieroRoutingModule,
    UIModule,
    WidgetModule,
    NgApexchartsModule,
    LayoutsModule
  ]
})
export class HomeFinancieroModule { }
