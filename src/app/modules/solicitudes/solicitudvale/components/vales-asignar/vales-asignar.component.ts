import { Component, Input, OnInit } from "@angular/core";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { IValesAsignar } from "../../../Interfaces/asignacionvale.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IValesAsignarPage } from "../../../Interfaces/solicitudValeAprobar.interface";
import { Observable } from "rxjs";
import { DetalleService } from "src/app/modules/asignacion-vales/services/detalle.service";
const DEFAULT_PAGE_SIZE = 1;
@Component({
  selector: "app-vales-asignar",
  templateUrl: "./vales-asignar.component.html",
  styleUrls: ["./vales-asignar.component.scss"],
})
export class ValesAsignarComponent implements OnInit {

  valesAsignarData: IValesAsignarPage[];

  total$: Observable<number>;
  vales$: Observable<IValesAsignarPage[]>;

  buscarVale: string = "";
  pVales: any;
  valesAsingar!: IValesAsignar;
  valesAsignarPage: IValesAsignarPage;
  currentPage = DEFAULT_PAGE_SIZE;
  cantVales: number;
  size: number;
  constructor(
    private modalService: NgbModal,
    public detalleService: DetalleService,
    private mensajesService: MensajesService
  ) {
    this.vales$ = detalleService.vales$;
    this.total$ = detalleService.total$;
  }

  @Input() cantidadVales!: any;
  ngOnInit(): void {
    //this.vales$ = this.detalleService.getValesAsignar(1)
  }

 /*  setOrders(vales: IValesAsignarPage[]) {
    this.valesAsignarData = vales;
    this.detalleService._search$.next(); // Vuelve a realizar la búsqueda y paginación
  } */

  valesAsignar(valesAsignarModal: any) {
    const cantidadVales = this.cantidadVales.get("cantidadVales")?.value;

    this.detalleService.getValesAsignar(cantidadVales);

    this.detalleService.getVales(cantidadVales).subscribe((data) =>{
      console.log("data: ", data);
      this.valesAsignarData = data
      console.log("interfaz: ", this.valesAsignarData);
    });
    //this.detalleService.getValesAsignar(cantidadVales)
    /* .subscribe({
      next: (resp) => {
         resp;
        console.log("resp: ", resp);
      },
    }); */
    //console.log("service: ", this.detalleService.getValesAsignar(cantidadVales));

    //this.total$ = this.detalleService.total$;
    /* this.cantVales = cantidadVales;
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
    } */
    /*this.service.getValesAsignarPage(0, cantidadVales, cantidadVales).subscribe({
      next: (resp) => {
        console.log("resp: ", resp);

        this.valesAsignarData = resp;
        console.log("valesAsignarData: ", this.valesAsignarData);
         this.valesAsignarPage = resp;
        this.cantVales = this.valesAsignarPage.totalRecords;
        if (this.cantVales == 0 || this.cantVales < 0) {
          this.mensajesService.mensajesToast(
            "warning",
            "Ingrese una cantidad válida"
          );
        } else if (this.cantVales > 20) {
          this.mensajesService.mensajesToast(
            "warning",
            "Sólo se pueden asignar 20 vales por solicitud"
          );
        } else {
          if (this.cantVales < 10 && this.cantVales > 5) {
            this.size = this.cantVales;
          } else if (this.cantVales <= 5) {
            this.size = this.cantVales;
          } else {
            this.size = 10;
          }
        }
      },
      error: (err) => {
        this.mensajesService.mensajesToast("error", err.error.error);
      },
    });*/
    this.modalService.open(valesAsignarModal, { size: "lg", centered: true });
  }

  /* get listaVales() {
    this.valesAsignarPage = this.service.listValesAsignar;
    return this.valesAsignarPage;
  } */

  /* onPageChange(page: number) {
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
  } */

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
