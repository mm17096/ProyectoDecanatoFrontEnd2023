import { Component, OnInit, Input } from '@angular/core';
import { IDocumentosvale } from '../../interface/IDocumentosvale';
import { DocumentovaleService } from '../../service/documentovale.service';


@Component({
  selector: 'app-tabladocumentovale',
  templateUrl: './tabladocumentovale.component.html',
  styleUrls: ['./tabladocumentovale.component.scss']
})
export class TabladocumentovaleComponent implements OnInit {
  @Input() documentoOd!: IDocumentosvale[];
  @Input() queryString: string;
  documentosvale: IDocumentosvale [] = [];//para almacenar los resultados
  
  p: any;

  constructor(private documentovaleservice: DocumentovaleService) { }

  ngOnInit(): void {
    this.obtenerlistaDocumento();
  }

  private obtenerlistaDocumento(){
    this.documentovaleservice.ObtenerLista.subscribe((resp: IDocumentosvale[]) => {
      this.documentosvale = resp;
      console.log(resp);
    });
  }



}
