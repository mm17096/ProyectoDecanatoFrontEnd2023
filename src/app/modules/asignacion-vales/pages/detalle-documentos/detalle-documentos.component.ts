import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDocumentosvale } from '../../interface/IDocumentosvale';
import { DetalleService } from '../../services/detalle.service';

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

  constructor(private modalService: NgbModal, private detalleservice: DetalleService) { }

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
