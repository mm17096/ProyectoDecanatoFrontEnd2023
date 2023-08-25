import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEmpleado } from '../interface/empleado.interface';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  empleados: IEmpleado[] = [];

  constructor(private empleadosService: EmpleadoService) { }

  ngOnInit() {
    this.getEmpleados();
  }


  getEmpleados() {
       this.empleadosService
      .getEmpleados()
      .subscribe((res) => {
        this.empleados = [...this.empleados, ...res];
      });
  }

}
