import { Component, Input, OnInit } from "@angular/core";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { ServiceService } from "../../../Service/service.service";
import { IValesAsignar } from "../../../Interfaces/asignacionvale.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { log } from "console";
import { IPaginacion } from "src/app/shared/models/IPaginacion.interface";
import { IValesAsignarPage } from "../../../Interfaces/solicitudValeAprobar.interface";
const DEFAULT_PAGE_SIZE = 1;
@Component({
  selector: "app-vales-asignar",
  templateUrl: "./vales-asignar.component.html",
  styleUrls: ["./vales-asignar.component.scss"],
})
export class ValesAsignarComponent implements OnInit {
  buscarVale: string = "";
  pVales: any;
  valesAsingar!: IValesAsignar;
  valesAsignarPage: IPaginacion<IValesAsignarPage>;
  currentPage = DEFAULT_PAGE_SIZE;
  cantVales: number;
  size: number;
  constructor(
    private modalService: NgbModal,
    private service: ServiceService,
    private mensajesService: MensajesService
  ) {}

  @Input() cantidadVales!: any;
  ngOnInit(): void {}

  valesAsignar(valesAsignarModal: any) {
    const cantidadVales = this.cantidadVales.get("cantidadVales")?.value;
    this.cantVales = cantidadVales;
    if (cantidadVales == 0 || cantidadVales < 0) {
      this.mensajesService.mensajesToast(
        "warning",
        "Ingrese una cantidad válida"
      );
    } else if (cantidadVales > 20) {
      this.mensajesService.mensajesToast(
        "warning",
        "Sólo se pueden asignar 20 vales por solicitud"
      );
    } else {
      if (cantidadVales < 10 && cantidadVales > 5) {
        this.size = cantidadVales;
      } else if (cantidadVales <= 5) {
        this.size = cantidadVales;
      } else {
        this.size = 10;
      }
      this.service.getValesAsignarPage(0, this.size, cantidadVales);
      this.modalService.open(valesAsignarModal, { size: "lg", centered: true });
    }
  }

  get listaVales() {
    this.valesAsignarPage = this.service.listValesAsignar;
    return this.valesAsignarPage;
  }

  onPageChange(page: number) {
    if (this.cantVales < 10 && this.cantVales > 5) {
      this.size = this.cantVales;
    } else if (this.cantVales <= 5) {
      this.size = this.cantVales;
    } else {
      this.size = 10;
    }
    this.service.getValesAsignarPage(
      page - 1,
      this.cantVales - this.size,
      this.cantVales
    );
  }

  get fechaActual() {
    // Obtiene la fecha actual
    const fechaActual = new Date();

    // Obtiene el año, el mes y el día por separado
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // El mes es de 0 a 11, así que sumamos 1
    const dia = fechaActual.getDate().toString().padStart(2, "0");

    // Formatea la fecha en "YYYY-MM-dd"
    const fechaFormateada = `${año}-${mes}-${dia}`;

    return fechaFormateada;
  }
}
