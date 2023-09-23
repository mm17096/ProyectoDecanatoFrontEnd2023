import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { DetalleService } from "../../services/detalle.service";
import {
  IAsignacionDetalle,
  IValesADevolver,
} from "../../interfaces/asignacion.interface";
import { TmplAstRecursiveVisitor } from "@angular/compiler";
import Swal from "sweetalert2";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { Router } from "@angular/router";
import { IValesAsignar } from "../../../solicitudes/Interfaces/asignacionvale.interface";

@Component({
  selector: "app-tabla-detalle",
  templateUrl: "./tabla-detalle.component.html",
  styleUrls: ["./tabla-detalle.component.scss"],
})
export class TablaDetalleComponent implements OnInit {
  buttonDisabled = true; // Estado del botón

  valesAsignados: IAsignacionDetalle;

  busqueda: string = "";
  p: any;
  term: any; // para buscar

  devolucionExito: boolean = false;
  vales = [];
  valesADevoler: IValesADevolver = {
    valesDevueltos: [],
    estadoVales: 8,
  };
  valesLiquid = [];
  constructor(
    private service: DetalleService,
    private http: HttpClient,
    private mensajesService: MensajesService,
    private router: Router
  ) {}

  @Input() codigoAsignacion: string = "";
  @Input() mision: string = "";

  ngOnInit(): void {
    this.mostrarVales();
    console.log("idtabla:", this.codigoAsignacion);
  }

  mostrarVales() {
    this.service.getDetalleAsignacionVale(this.codigoAsignacion).subscribe({
      next: (data) => {
        console.log("aquí llega:");

        this.valesAsignados = data;
        this.vales = this.valesAsignados.vales;

        this.valesAsignados.vales.forEach((element) => {
          this.valesLiquid.push(element.idVale);
        });
        console.log("aquí van los vales liquidar: ", this.valesLiquid);
        console.log("aquí van los vales: ", this.valesAsignados.vales);
      },
    });
  }

  valesDevolver(vales: any[], vale: string) {
    const todosDesmarcados = vales.every((vale) => !vale.checked);
    this.buttonDisabled = todosDesmarcados;

    if (this.valesADevoler.valesDevueltos.length == 0) {
      this.valesADevoler.valesDevueltos.push(vale);
      console.log("vales a devolver: ", this.valesADevoler.valesDevueltos);
    } else {
      let valeABuscar: string = vale;
      const valeEncontrado =
        this.valesADevoler.valesDevueltos.indexOf(valeABuscar);
      if (valeEncontrado !== -1) {
        this.valesADevoler.valesDevueltos.splice(valeEncontrado, 1);
        console.log("vale ya existe", this.valesADevoler.valesDevueltos);
      } else {
        this.valesADevoler.valesDevueltos.push(vale);
        console.log("vales a devolver: ", this.valesADevoler.valesDevueltos);
      }
    }
  }

  async devolverVales() {
    if ((await this.service.mensajesConfirmarDevolucion()) == true) {
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
        this.service.devolverVales(this.valesADevoler).subscribe({
          next: (data: any) => {
            // Cerrar SweetAlert de carga
            Swal.close();
            this.mostrarVales();
            this.buttonDisabled = true;
            this.vales = this.valesADevoler.valesDevueltos;
            this.mensajesService.mensajesToast("success", "Vales devueltos");
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
  mostrar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
