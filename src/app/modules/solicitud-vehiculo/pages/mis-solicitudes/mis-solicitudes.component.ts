import { Component, OnInit } from '@angular/core';
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";
import {ISolicitudVehiculo} from "../../interfaces/data.interface";
import {IEstados} from "../../interfaces/estados.interface";

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.scss']
})
export class MisSolicitudesComponent implements OnInit {

  // migas de pan
  breadCrumbItems: Array<{}>;
  term: any; // para buscar
  p: any; // paginacion

  solicitudesVehiculo: ISolicitudVehiculo [] = [];
  estadosSoliVe: IEstados [] = [];

  constructor( private soliVeService: SolicitudVehiculoService ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solicitud de Vehículo' }, { label: 'Mis Solicitudes', active: true }]; // miga de pan
    this.getSolicitudes();
    this.getEstados();
  }

  // Metodo para obtener todas las solicitudes de vehiculo
  getSolicitudes() {
    this.soliVeService.obtenerSolicitudes().subscribe( (resp) => {
      this.solicitudesVehiculo = resp;
    });
  }

  getSolicitudesEstado(estado: number) {
    this.soliVeService.obtenerSoliVePorEstado(estado).subscribe((resp) => {
      this.solicitudesVehiculo = resp;
    });
  }

  onEstadoSeleccionado(event: any) {
    const estadoSeleccionado = event.target.value;
    if (estadoSeleccionado == 0) {
      this.getSolicitudes();
    } else {
      this.getSolicitudesEstado(Number(estadoSeleccionado));
    }
  }


  getEstados() {
    this.soliVeService.obtenerEstados().subscribe((resp) => {
      this.estadosSoliVe = resp;
    });
  }

  calcularNumeroCorrelativo(index: number): number {
    if (typeof this.p === 'number') {
      return (this.p - 1) * 10 + index + 1;
    } else {
      return index + 1; // Si no es numérico, solo regresamos el índice + 1
    }
  }

}
