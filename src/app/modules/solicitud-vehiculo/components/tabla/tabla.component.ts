import {Component, Input, OnInit} from '@angular/core';
import {ISolicitudVehiculo} from "../../interfaces/data.interface";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";
import { ModalSecretariaComponent } from '../modal-secretaria/modal-secretaria.component';
import {MensajesService} from "../../../../shared/global/mensajes.service";
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";
import Swal from "sweetalert2";
import {Usuario} from "../../../../account/auth/models/usuario.models";
import {ISolicitudvalep} from "../../../solicitud-vale-paginacion/interface/solicitudvalep.interface";

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
  @Input() userAcivo!: Usuario;
  p: any; // paginacion
  selectedData: any; // Almacena los datos del registro seleccionado
  solicitudVale!: ISolicitudvalep;
  constructor(private modalService: NgbModal,
              private mensajesService: MensajesService,
              private soliService: SolicitudVehiculoService) {
    this.solicitudVale = {
      idSolicitudVale: '',
      cantidadVale: 0,
      estadoEntrada: 1,
      estado: 8,
      solicitudVehiculo: '' // Otra inicialización si es necesario
    };
  }

  ngOnInit(): void {
    // console.log("tabla",this.vista);
    // console.log("ver: ",this.solicitudesVehiculo)
    console.log("userACtivo:", this.userAcivo);
  }


  abrirModal(leyenda: string, data: any) {
    this.selectedData = data; // Almacena los datos del registro seleccionado
    const modalRef = this.modalService.open(ModalComponent, {size:'xl', backdrop: 'static'});
    modalRef.componentInstance.leyenda = leyenda; // Pasa la leyenda al componente modal
    modalRef.componentInstance.soliVeOd = data;
    modalRef.componentInstance.vista = this.vista;
    modalRef.componentInstance.usuarioActivo = this.userAcivo;
  }

  abrirModalSecre(leyenda: string, data: any) {
    this.selectedData = data;
    const modalRef = this.modalService.open(ModalSecretariaComponent, {size:'xl', backdrop: 'static'});
    modalRef.componentInstance.leyenda = leyenda;
    modalRef.componentInstance.soliVeOd = data;
  }

  async aprobarSolicitud(data: any){
    console.log(data);
    if ((await this.mensajesService.mensajeAprobar()) == true) {
      //await this.actualizarSolicitud(data);
      if (this.userAcivo.role=="JEFE_DEPTO"){
        await this.actualizarSolicitud(data);
      }else{
        await this.actualizarSolicitudDec(data);
      }
    }
  }

  actualizarSolicitud(data: any):Promise <void>{
    return new Promise<void>((resolve, reject) => {
      this.soliService.updateSolciitudVehiculo(data).subscribe({
        next: (resp: any) => {
          this.soliService.getSolicitudesRol(this.userAcivo.role);
          this.mensajesService.mensajesToast("success", "Solicitud aprobada con éxito");
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

  actualizarSolicitudDec(data: any):Promise <void>{
    console.log("emtro ");
    return new Promise<void>((resolve, reject) => {
      this.soliService.updateSolciitudVehiculo(data).subscribe({
        next: (resp: any) => {

          this.solicitudVale.cantidadVale =0 ;
          this.solicitudVale.estadoEntrada = 1;
          this.solicitudVale.estado = 8;
          this.solicitudVale.solicitudVehiculo = data.codigoSolicitudVehiculo;

          console.log("soliva," + this.solicitudVale);

          this.soliService.registrarSolicitudVale(this.solicitudVale).subscribe({
            next: (valeResp: any) => {
              this.soliService.getSolicitudesRol(this.userAcivo.role);
              this.mensajesService.mensajesToast("success", "Solicitud aprobada con éxito");
              resolve();
            },
            error: (errorSoli) => {
              Swal.close();
              this.mensajesService.mensajesSweet(
                'error',
                'Ups... Algo salió mal al aprobar la solicitud',
                errorSoli.error.message
              );
              reject (errorSoli);
            },
          })
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
