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
  vaciarFechas() {
    while (this.fechaformateada.length > 0) {
      this.fechaformateada.pop();
    }
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

  obtenerFechaFormateada(data: ISolicitudValeAprobar) {
    if (Array.isArray(data) && data.length > 0) {
      //vacio las fechas
      this.vaciarFechas();
      // Accedemos a la propiedad fechaSalida del primer elemento del arreglo
      for (let index = 0; index < data.length; index++) {

        this.fechaSalida = data[index].fechaSalida;

        const fechaf = this.obtenerNombreDiaYMes(this.fechaSalida);
        const anio = this.dividirFecha(this.fechaSalida);
        const dia = this.dividirFecha(this.fechaSalida);
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

  verDetalle() {}

  revision() {}

  aprobar() {}

  obtenerNombreDiaYMes(
    fechaStr: string
  ): { nombreDia: string; nombreMes: string } | null {
    const fecha = new Date(fechaStr);

    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
      return null; // La fecha no es válida
    }

    const opcionesDia: Intl.DateTimeFormatOptions = { weekday: "long" }; // 'long' para obtener el nombre completo del día
    const opcionesMes: Intl.DateTimeFormatOptions = { month: "long" }; // 'long' para obtener el nombre completo del mes

    const nombreDia = fecha.toLocaleDateString(undefined, opcionesDia);
    const nombreMes = fecha.toLocaleDateString(undefined, opcionesMes);

    return { nombreDia, nombreMes };
  }

  dividirFecha(
    fechaStr: string
  ): { anio: string; mes: string; día: string } | null {
    // Dividir la cadena de fecha en sus componentes utilizando '/'
    const partes = fechaStr.split("-");

    // Verificar si hay tres componentes (año, mes y día)
    if (partes.length === 3) {
      const anio = partes[0];
      const mes = partes[1];
      const día = partes[2];

      return { anio, mes, día };
    } else {
      return null; // La cadena de fecha no tiene el formato esperado
    }
  }
}
