import { Component, Input, OnInit } from '@angular/core';
import { ICompra } from '../../interface/datos.interface';
import { CompraService } from '../../service/compra.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() compras!: ICompra[];
  @Input() queryString!: string;
  p: any;

  constructor(private compraService: CompraService) { }

  ngOnInit(): void {
  }

}
