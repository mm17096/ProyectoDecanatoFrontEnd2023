import { Component, OnInit } from '@angular/core';
import { CargoService } from '../service/cargoservice';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  constructor(private cargoService : CargoService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Formulario' }, { label: 'Listar', active: true }];
  }

}
