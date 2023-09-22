import { Component, Input, OnInit } from "@angular/core";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { ServiceService } from "../../../Service/service.service";
import { IValesAsignar } from "../../../Interfaces/asignacionvale.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { log } from "console";

@Component({
  selector: "app-vales-asignar",
  templateUrl: "./vales-asignar.component.html",
  styleUrls: ["./vales-asignar.component.scss"],
})
export class ValesAsignarComponent implements OnInit {
  buscarVale: string ="";
  pVales: any
  valesAsingar!: IValesAsignar;
  constructor(
    private modalService: NgbModal,
    private service: ServiceService,
    private mensajesService: MensajesService
  ) {}

  @Input() cantidadVales!: any;
  ngOnInit(): void {}

  valesAsignar(valesAsignarModal: any) {
    const cantidadVales = this.cantidadVales.get("cantidadVales")?.value;

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
      this.service.getValesAignar(cantidadVales).subscribe({
        next: (response) => {
          this.valesAsingar = response;
        },
      });
      this.modalService.open(valesAsignarModal, { size: "lg", centered: true });
    }
  }
}
