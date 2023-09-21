import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { ISolicitudValeAprobar } from "../Interfaces/solicitudValeAprobar.interface";
import { ServiceService } from "../Service/service.service";
import { log } from "console";

@Component({
  selector: "app-solicitud-vale-aprobar",
  templateUrl: "./solicitud-vale-aprobar.component.html",
  styleUrls: ["./solicitud-vale-aprobar.component.scss"],
})
export class SolicitudValeAprobarComponent implements OnInit {
  //interfaz para las solicitudes de vale
  solicitudesVales: ISolicitudValeAprobar;

  //para las migas de pan
  breadCrumbItems: Array<{}>;
  //para la paginación
  p: any;
  term: any;

  //filtro para las solicitudes
  filtroEstado: number;

  //para pasar los estados a string
  estadoSoli = "";

  //fecha con formato
  fechaformateada = [];

  //fecha de Salida
  fechaSalida: string;

  constructor(
    private service: ServiceService,
    private mensajesService: MensajesService,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Solicitud de Vales" },
      { label: "Solicitudes por Aprobar", active: true },
    ]; // miga de pan
    this.getSolicitudesVale(1);
  }

  getSolicitudesVale(estado: number) {
    this.service.getSolicitdValePorEstado(estado).subscribe({
      next: (data) => {
        this.solicitudesVales = data;
        this.obtenerFechaFormateada(data);
        this.asignacionEstados(estado);
      },
    });
  }

  filtrar(event: any) {
    this.filtroEstado = event;
    this.getSolicitudesVale(this.filtroEstado);
  }

  asignacionEstados(estado: number){
    if (estado == 1) {
      this.estadoSoli = "Por Aprobar";
    } else if (estado == 6) {
      this.estadoSoli = "Revisión";
    } else {
      this.estadoSoli = "Aprobada";
    }
  }

  obtenerFechaFormateada(data: any) {
    if (Array.isArray(data) && data.length > 0) {
      //vacio las fechas
      this.vaciarFechas();
      // Accedemos a la propiedad fechaSalida del primer elemento del arreglo
      for (let index = 0; index < data.length; index++) {

        this.fechaSalida = data[index].fechaSalida;

        const fechaf = this.service.obtenerNombreDiaYMes(this.fechaSalida);
        const anio = this.service.dividirFecha(this.fechaSalida);
        const dia = this.service.dividirFecha(this.fechaSalida);
        this.fechaformateada.push(
          fechaf.nombreDia +
            ", " +
            dia.día +
            " de " +
            fechaf.nombreMes +
            " de " +
            anio.anio
        );
      }
      // Por ejemplo, data[0].nombreSolicitante para acceder al nombre del solicitante del primer elemento
    }
  }
  vaciarFechas() {
    while (this.fechaformateada.length > 0) {
      this.fechaformateada.pop();
    }
  }

  verDetalle() {}

  revision() {}

  aprobar() {}


}
