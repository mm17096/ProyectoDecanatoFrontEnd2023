import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DocumentosolcitudValeRoutingModule } from './documentosolcitud-vale-routing.module';
import { ListardocumentovaleComponent } from './pages/listardocumentovale/listardocumentovale.component';
import { TabladocumentovaleComponent } from './pages/tabladocumentovale/tabladocumentovale.component';
import { ModulodocumentovaleComponent } from './pages/modulodocumentovale/modulodocumentovale.component';
import { DocumentovaleService } from './service/documentovale.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ChartsModule } from 'ng2-charts';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ListardocumentovaleComponent,
    TabladocumentovaleComponent,
    ModulodocumentovaleComponent
  ],
  imports: [
    CommonModule,
    DocumentosolcitudValeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,//para las peticiones
    InfiniteScrollModule,//para scroll infinito
    UIModule,//para la modal
    FormsModule,//
    NgApexchartsModule,
    ChartsModule,//para las graficas
    NgbModalModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    //BrowserModule
  ],
  providers:[
    DocumentovaleService,
    //DatePipe
  ],
})
export class DocumentosolcitudValeModule { }
