import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { ISolicitudValeAprobar } from "../Interfaces/solicitudValeAprobar.interface";
import { ServiceService } from "../Service/service.service";
import { log } from "console";
import { NUMBER_VALIDATE } from "src/app/constants/constants";

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

  //formulario del detalle
  formularioSolicitudVale: FormGroup;

  alerts = [
    {
      id: 1,
      type: "info",
      message:
        " Si se envia a Revisión por favor escriba una observación porqué lo hace.",
      show: false,
    },
  ];

  //  para validar que sea un numero
  private isNumber: string = NUMBER_VALIDATE;

  constructor(
    private service: ServiceService,
    private mensajesService: MensajesService,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.iniciarFormulario();
  }

  private iniciarFormulario() {
    this.formularioSolicitudVale = this.fb.group({
      concepto: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(750),
        ],
      ],
      cantidadVales: new FormControl("", [Validators.required]),
      fechaSolicitud: new FormControl("", [Validators.required]),
      fechaEntrada: new FormControl("", [Validators.required]),
      fechaSalida: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required]),
      mision: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      motorista: new FormControl("", [Validators.required]),
      solicitante: new FormControl("", [Validators.required]),
      placa: new FormControl("", [Validators.required]),
      cantidadPersonas: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required]),
      unidadSolicitante: new FormControl("", [Validators.required]),
      nombreJefeDepto: new FormControl("", [Validators.required]),
      observacionRevision: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Solicitud de Vales" },
      { label: "Solicitudes por Aprobar", active: true },
    ]; // miga de pan
    this.getSolicitudesVale(4);
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

  asignacionEstados(estado: number) {
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



  verDetalle(modal: any, solicitud: ISolicitudValeAprobar) {
    //esto es para obtener el id de la solicitud de vale

    this.modalService.open(modal, { size: "lg", centered: true });
    const cantidadVales = solicitud.cantidadVales;
    const fechaSolicitud = this.service.fechaFormatoGenerico(solicitud.fechaSolicitud);
    const fechaEntrada = this.service.fechaFormatoGenerico(solicitud.fechaEntrada);
    const fechaSalida = this.service.fechaFormatoGenerico(solicitud.fechaSalida);
    const mision = solicitud.mision;
    const motorista = solicitud.nombreMotorista;
    const solicitante = solicitud.nombreSolicitante;
    const placa = solicitud.placaVehiculo;
    const cantidadPersonas = solicitud.cantidadPersonas;
    const direccion = solicitud.direccionMision;
    const unidadSolicitante = solicitud.unidadSolicitante;
    //modal de detalle de solicitud de vehiculo
    this.formularioSolicitudVale
      .get("cantidadVales")
      ?.setValue(Number(cantidadVales));
    this.formularioSolicitudVale
      .get("fechaSolicitud")
      ?.setValue(String(fechaSolicitud));
    this.formularioSolicitudVale
      .get("fechaEntrada")
      ?.setValue(String(fechaEntrada));
    this.formularioSolicitudVale
      .get("fechaSalida")
      ?.setValue(String(fechaSalida));
    this.formularioSolicitudVale.get("mision")?.setValue(String(mision));
    this.formularioSolicitudVale.get("motorista")?.setValue(String(motorista));
    this.formularioSolicitudVale
      .get("solicitante")
      ?.setValue(String(solicitante));
    this.formularioSolicitudVale.get("placa")?.setValue(String(placa));
    this.formularioSolicitudVale
      .get("cantidadPersonas")
      ?.setValue(String(cantidadPersonas));
    this.formularioSolicitudVale.get("direccion")?.setValue(String(direccion));
    this.formularioSolicitudVale
      .get("unidadSolicitante")
      ?.setValue(String(unidadSolicitante));
  }

  revision() {}

  aprobar() {}

  esCampoValido(campo: string) {
    const validarCampo = this.formularioSolicitudVale.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }
  CambiarAlert(alert) {
    alert.show = !alert.show;
  }
  siMuestraAlertas() {
    return this.alerts.every((alert) => alert.show);
  }

  restaurarAlerts() {
    this.alerts.forEach((alert) => {
      alert.show = true;
    });
  }
}
