import { Component, OnInit, Input } from '@angular/core';
import { IProveedor } from '../../interface/proveedor.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() proveedores!: IProveedor[];
  @Input() queryString!: string;
  p: any;

  constructor() { }

  ngOnInit(): void {
  }

}
