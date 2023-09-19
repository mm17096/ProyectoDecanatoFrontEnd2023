import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDocumentosvale } from '../../interface/IDocumentosvale';
import { DetalleService } from '../../services/detalle.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-detalle-documentos',
  templateUrl: './detalle-documentos.component.html',
  styleUrls: ['./detalle-documentos.component.scss']
})
export class DetalleDocumentosComponent implements OnInit {
  @Input() leyenda!: string;
  @Input() titulo!: string;
  entradasalidas: IDocumentosvale[]=[];
  @Input() queryString: string;
  p: any;
  @Input() busqueda: string = '';
  termBusca: string = ''; // Variable para rastrear el término de búsqueda
  b: number = 1;
  //para descargar documentos
  myFiles: File[]=[];
  allFiles: IDocumentosvale[]=[];

  //configuracion de dropzone
  config: DropzoneConfigInterface={
    maxFilesize: 500,
    addRemoveLinks: true,
    uploadMultiple: true,
    accept:(file:File)=>{
      this.myFiles.push(file);
    }
  }


  constructor(private modalService: NgbModal, private detalleservice: DetalleService, private uploadservice: UploadService) { }

  ngOnInit(): void {
    this.obtenerLista();
  }
  filtrarDatos() {
    return this.entradasalidas.filter(data =>
      data.comprobante.includes(this.termBusca) ||
      data.fecha.includes(this.termBusca) ||
      data.tipo.includes(this.termBusca) ||
      data.foto.includes(this.termBusca)
    );
  }
//para descargar documentos
  descargar(id: string, name: string){
    this.uploadservice.download1(id).subscribe(resp=>{
      this.administradorDescarga(name, resp);
    })
  }

  administradorDescarga(name: string, resp: File){
    const dataType= resp.type;
    const dataBinary= [];
    dataBinary.push(resp);

    const filePath= window.URL.createObjectURL(new Blob(dataBinary, {type: dataType}));
    const downloadlink=document.createElement('a');
    downloadlink.href=filePath;
    downloadlink.setAttribute('download', name);
    document.body.appendChild(downloadlink);
    downloadlink.click();

  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }
  private obtenerLista() {//para poder mostrar e la tabla
    this.detalleservice.ObtenerLista.subscribe((resp: IDocumentosvale[]) => {
      this.entradasalidas = resp;
      console.log(resp);
    });

  }

}
