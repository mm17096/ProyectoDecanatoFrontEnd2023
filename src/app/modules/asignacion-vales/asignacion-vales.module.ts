import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionValesRoutingModule } from './asignacion-vales-routing.module';
import { TablaDetalleComponent } from './pages/tabla-detalle/tabla-detalle.component';
import { EncabezadoComponent } from './pages/encabezado/encabezado.component';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ModalDocumentosComponent } from './components/modal-documentos/modal-documentos.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDropdownModule, NgbModalModule, NgbModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';


@NgModule({
    declarations: [
        TablaDetalleComponent,
        EncabezadoComponent,
        ModalDocumentosComponent
    ],
    imports: [
        CommonModule,
        AsignacionValesRoutingModule,
        UIModule,
        FormsModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        DropzoneModule,
        Ng5SliderModule,
        NgxMaskModule.forRoot(), //para las mascaras
        NgSelectModule,
        NgbPaginationModule,
        WidgetModule,
        NgbDropdownModule,
        NgbModalModule,
        NgbModule,
        NgbNavModule,


    ]
})
export class AsignacionValesModule { }
