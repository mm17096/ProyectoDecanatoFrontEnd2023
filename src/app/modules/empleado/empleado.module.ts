import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { ListarComponent } from './listar/listar.component';
import { TablaComponent } from './tabla/tabla.component';
import { ModalComponent } from './modal/modal.component';

import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';

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
        NgbModalModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgbDropdownModule,
        DropzoneModule,
        ReactiveFormsModule,
        WidgetModule,
        Ng5SliderModule,
        NgSelectModule,
        NgbPaginationModule
    ]
})
export class EmpleadoModule { }
