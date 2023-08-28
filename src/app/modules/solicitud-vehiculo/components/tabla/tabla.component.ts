import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ISolicitudVehiculo2} from "../../interfaces/solive.interface";
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";
import {ISolicitudVehiculo} from "../../interfaces/data.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() solicitudesVehiculo: ISolicitudVehiculo2[] = [];
  @Input() term: any; // para buscar
  p: any; // paginacion
  constructor() { }

  ngOnInit(): void {

  }

  calcularNumeroCorrelativo(index: number): number {
    if (typeof this.p === 'number') {
      return (this.p - 1) * 10 + index + 1;
    } else {
      return index + 1; // Si no es numérico, solo regresamos el índice + 1
    }
  }

}
