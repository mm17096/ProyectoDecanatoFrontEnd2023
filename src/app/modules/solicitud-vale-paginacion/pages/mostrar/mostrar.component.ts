import { Component, OnInit } from '@angular/core';
import { SolicitudvaleService } from '../../services/solicitudvale.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term: string = '';
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solictud Vale' }, { label: 'Paginación', active: true }];

  }

}
