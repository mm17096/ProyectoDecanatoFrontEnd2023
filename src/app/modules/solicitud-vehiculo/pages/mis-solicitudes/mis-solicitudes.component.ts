import { Component, OnInit } from '@angular/core';
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";
import {IEstados} from "../../interfaces/estados.interface";
import {ISolicitudVehiculo} from "../../interfaces/data.interface";
import {ModalComponent} from "../../components/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  page:number = 0;
  size:number = 10;

  solicitudesVehiculo: ISolicitudVehiculo [] = [];
  estadosSoliVe: IEstados [] = [];

  constructor( private soliVeService: SolicitudVehiculoService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solicitud de Vehículo' }, { label: 'Mis Solicitudes', active: true }]; // miga de pan
    this.soliVeService.getSolicitudesVehiculo(null);
    this.getEstados();
  }

  abrirModal(leyenda: string) {
    const modalRef = this.modalService.open(ModalComponent, {size: 'xl', backdrop: 'static'});
    modalRef.componentInstance.leyenda = leyenda;
  }

  get listSoliVeData(){
    return this.soliVeService.listSoliVehiculo;
  }

  onEstadoSeleccionado(event: any) {
    const estadoSeleccionado = event.target.value;
    if (estadoSeleccionado == 0) {
      this.soliVeService.getSolicitudesVehiculo(null);
    } else {
      this.soliVeService.getSolicitudesVehiculo(estadoSeleccionado);
    }
  }


  getEstados() {
    this.soliVeService.obtenerEstados().subscribe((resp) => {
      this.estadosSoliVe = resp;
    });
  }

}
