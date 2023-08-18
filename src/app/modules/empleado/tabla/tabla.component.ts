import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEmpleadoTabala } from '../interface/empleado.interface';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  empleadostabla: IEmpleadoTabala[] = [];

  constructor(private empleadosService: EmpleadoService) { }

  ngOnInit() {
    this.getEmpleados();
  }


  getEmpleados() {
       this.empleadosService
      .getEmpleadosTabla()
      .subscribe((res) => {
        console.log(res);
        this.empleadostabla = [...this.empleadostabla, ...res];
      });
  }

}
