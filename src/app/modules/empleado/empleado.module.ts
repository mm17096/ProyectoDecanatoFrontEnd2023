import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { ListarComponent } from './pages/listar/listar.component';
import { TablaComponent } from './pages/tabla/tabla.component';

@NgModule({
    declarations: [
        ListarComponent,
        TablaComponent,
        ModalComponent,
    ],
    imports: [
        CommonModule,
        EmpleadoRoutingModule,
        UIModule,
        NgbNavModule,
        NgbModule,
        NgbModalModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgbDropdownModule,
        ReactiveFormsModule,
        NgxPaginationModule, //para paginar
        WidgetModule,
        Ng5SliderModule,
        NgSelectModule,
        NgbPaginationModule,
        NgxMaskModule.forRoot(), //para las mascaras
    ]
})
export class EmpleadoModule { }
