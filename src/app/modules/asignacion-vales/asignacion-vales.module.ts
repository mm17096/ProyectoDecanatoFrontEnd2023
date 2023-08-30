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
        DropzoneModule
    ]
})
export class AsignacionValesModule { }
