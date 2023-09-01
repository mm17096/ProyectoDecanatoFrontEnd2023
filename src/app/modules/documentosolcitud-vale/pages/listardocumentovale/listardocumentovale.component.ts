import { Component, OnInit } from '@angular/core';
import { IDocumentosvale } from '../../interface/IDocumentosvale';

@Component({
  selector: 'app-listardocumentovale',
  templateUrl: './listardocumentovale.component.html',
  styleUrls: ['./listardocumentovale.component.scss']
})
export class ListardocumentovaleComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  term: string='';
  documentosvale: IDocumentosvale [] = [];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Carga' }, { label: 'Documentos', active: true }];

  }

}
