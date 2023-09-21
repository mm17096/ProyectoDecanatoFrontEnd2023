import {Component, Input, OnInit} from '@angular/core';
import {ISolicitudVehiculo} from "../../interfaces/data.interface";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";
import {MensajesService} from "../../../../shared/global/mensajes.service";
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() solicitudesVehiculo!: ISolicitudVehiculo[];
  @Input() opc!: string;
  @Input() term!: any; // para buscar
  @Input() vista!: string;
  p: any; // paginacion
  selectedData: any; // Almacena los datos del registro seleccionado
  constructor(private modalService: NgbModal,
              private mensajesService: MensajesService,
              private soliService: SolicitudVehiculoService) { }

  ngOnInit(): void {
    console.log("tabla",this.vista);
    console.log("ver: ",this.solicitudesVehiculo)
  }

  abrirModal(leyenda: string, data: any) {
    this.selectedData = data; // Almacena los datos del registro seleccionado
    const modalRef = this.modalService.open(ModalComponent, {size:'xl', backdrop: 'static'});
    modalRef.componentInstance.leyenda = leyenda; // Pasa la leyenda al componente modal
    modalRef.componentInstance.soliVeOd = data;
    modalRef.componentInstance.vista = this.vista;
  }

  async aprobarSolicitud(data: any){
    console.log(data);
    if ((await this.mensajesService.mensajeAprobar()) == true) {
      this.actualizarSolicitud(data);
    }
  }

  actualizarSolicitud(data: any):Promise <void>{
    let update = data;
    return new Promise<void>((resolve, reject) => {
      this.soliService.updateSolciitudVehiculo(data).subscribe({
        next: (resp: any) => {
          this.soliService.getSolicitudesRol("JEFE_DEPTO");
          this.mensajesService.mensajesToast("success", "Registro agregado");
          resolve();
        },
        error: (error) => {
          Swal.close();
          this.mensajesService.mensajesSweet(
            'error',
            'Ups... Algo salió mal',
            error.error.message
          );
          reject (error);
        },
      });
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
