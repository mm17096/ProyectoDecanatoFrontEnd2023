import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: string = '';

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Empleado' }, { label: 'Listar', active: true }];
    this.empleadoService.getEmpleados();
  }

  get listaEmpleados() {
    return this.empleadoService.listEmpleados;
  }

}
