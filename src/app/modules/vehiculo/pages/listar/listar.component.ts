import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   termBusca: string;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Vehiculo' }, { label: 'Listar', active: true }];
  }

}
