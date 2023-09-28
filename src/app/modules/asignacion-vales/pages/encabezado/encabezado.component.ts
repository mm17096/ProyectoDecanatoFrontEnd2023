import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DetalleService } from "../../services/detalle.service";
import {
  IAsignacionDetalle,
  IAsignacionValeSolicitud,
  ILiquidacion,
} from "../../interfaces/asignacion.interface";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablaDetalleComponent } from "../tabla-detalle/tabla-detalle.component";
import Swal from "sweetalert2";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { IAnularMision } from "../../interfaces/asignacion.interface";
import { DetalleDocumentosComponent } from "../detalle-documentos/detalle-documentos.component";
import { arrayModel } from "../../../../pages/ecommerce/product.model";
import { ModalDocumentosComponent } from "../../components/modal-documentos/modal-documentos.component";
import { IDocumentosvale } from "../../interface/IDocumentosvale";
import {
  ISolcitudAprobar,
  ISolicitudValeAprobar,
} from "src/app/modules/solicitudes/Interfaces/solicitudValeAprobar.interface";

@Component({
  selector: "app-encabezado",
  templateUrl: "./encabezado.component.html",
  styleUrls: ["./encabezado.component.scss"],
})
export class EncabezadoComponent implements OnInit {
  detalleAsignacion: IAsignacionDetalle;

  breadCrumbItems: Array<{}>;

  @ViewChild(TablaDetalleComponent) valesLiquidar;

  p: any;
  term: string = "";
  currentPage = 1;
  codigoAsignacion: string;
  codigoSolicutdVale: string;
  solcitudVale: ISolicitudValeAprobar;
  estadoEntrada!: number;
  liquidacion: ILiquidacion = {
    idAsignacionVale: "",
    valesLiquidar: [],
  };
  misionAnulada: IAnularMision = {
    cosdigoAsignacion: "",
    valesAsignacion: [],
  };
  arregloVales = [];
  mision: string = "";

  asignacionSolicitud: IAsignacionValeSolicitud;
  idSolicitud: string;
  entradasalidas: IDocumentosvale[] = [];

  listaDocumentosSize: number;
  constructor(
    private service: DetalleService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private mensajesService: MensajesService
  ) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Vales" },
      { label: "Asignación de Vales" },
      { label: "Registro de Asignaciones", active: true },
    ];

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.codigoAsignacion = params.get("codigoAsignacion");
    });

    this.obtnerEncabezado(this.codigoAsignacion);
    this.ObtenerSolicitudValeById(this.codigoAsignacion);
  }
  ngAfterViewInit() {
    this.liquidacion.idAsignacionVale = this.codigoAsignacion;
    this.misionAnulada.cosdigoAsignacion = this.codigoAsignacion;
    this.liquidacion.valesLiquidar = this.valesLiquidar.valesLiquid;
    this.misionAnulada.valesAsignacion = this.valesLiquidar.valesLiquid;
  }

  obtnerEncabezado(codigoA: string) {
    this.service.getDetalleAsignacionVale(codigoA).subscribe({
      next: (data) => {
        this.detalleAsignacion = data;
        this.mision = this.detalleAsignacion.mision;
      },
    });
  }

  volver() {
    this.router.navigate(["/solicitudes/solicitudvale"]);
  }

  async liquidar() {
    if (this.estadoEntrada == 2) {
      if (this.listaDocumentosSize == 2) {
        if ((await this.service.mensajesConfirmarLiquidacion()) == true) {
          Swal.fire({
            title: "Espere",
            text: "Realizando la acción...",
            icon: "info",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: false,
            showConfirmButton: false,
          });
          return new Promise<void>((resolve, reject) => {
            this.service.liquidarVales(this.liquidacion).subscribe({
              next: (data: any) => {
                // Cerrar SweetAlert de carga
                Swal.close();
                this.mensajesService.mensajesToast(
                  "success",
                  "Misión Finalizada"
                );
                this.router.navigate(["/solicitudes/solicitudvale"]);
                resolve(); // Resuelve la promesa sin argumentos
              },
              error: (err) => {
                // Cerrar SweetAlert de carga
                Swal.close();
                this.mensajesService.mensajesSweet(
                  "error",
                  "Ups... Algo salió mal",
                  err.error.message
                );
                reject(err); // Rechaza la promesa con el error
              },
            });
          });
        }
      } else if (this.listaDocumentosSize == 1) {
        this.mensajesService.mensajesToast(
          "warning",
          "Falta un docuemnto de la misión"
        );
      } else {
        this.mensajesService.mensajesToast(
          "warning",
          "Debe subir los documentos de la misión"
        );
      }
    } else {
      this.mensajesService.mensajesToast(
        "warning",
        "Vehículo no ha regresado de la misión"
      );
    }
  }

  async anular() {
    if ((await this.service.mensajesConfirmarAnular()) == true) {
      Swal.fire({
        title: "Espere",
        text: "Realizando la acción...",
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: false,
        showConfirmButton: false,
      });
      return new Promise<void>((resolve, reject) => {
        this.service.anularMision(this.misionAnulada).subscribe({
          next: (data: any) => {
            // Cerrar SweetAlert de carga
            Swal.close();
            this.mensajesService.mensajesToast("success", "Misión Anulada");
            this.router.navigate(["/solicitudes/solicitudvale"]);
            resolve(); // Resuelve la promesa sin argumentos
          },
          error: (err) => {
            // Cerrar SweetAlert de carga
            Swal.close();
            this.mensajesService.mensajesSweet(
              "error",
              "Ups... Algo salió mal",
              err.error.message
            );
            reject(err); // Rechaza la promesa con el error
          },
        });
      });
    }
  }

  /*** ESTOS MÉTODOS SON PARA OBTENER EL TAMAÑO DE LA LISTA DE ADOCUMENTOS */
  ObtenerSolicitudValeById(codigoA: string) {
    this.service.getAsignacionValeSolicitudVale(codigoA).subscribe({
      next: (data) => {
        this.asignacionSolicitud = data;
        this.idSolicitud =
          this.asignacionSolicitud.solicitudVale.idSolicitudVale;
          this.obtenerLista(this.idSolicitud);
        this.obtenerSolicitud(this.idSolicitud);
      },
    });
  }
  obtenerSolicitud(id: string) {
    this.service.getSolicitudVale(id).subscribe({
      next: (data) => {
        console.log("resp: ", data);
        this.estadoEntrada = data[0].estadoEntradaSolicitudVale;
      },
    });
  }

  obtenerLista(id: string) {
    //para poder mostrar e la tabla
    this.service.ObtenerLista(id).subscribe(
      (resp: IDocumentosvale[]) => {
        this.entradasalidas = resp;

        this.listaDocumentosSize = resp.length;
      },
      (error) => {
        // Manejar errores aquí
      }
    );
  }
}
