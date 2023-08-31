import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../../components/modal/modal.component";
import { VehiculoService } from "../../service/vehiculo.service";
import { IVehiculos } from "../../interfaces/vehiculo-interface";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  termBusca: string;

  //var
  vehiculos:IVehiculos[] = [];

  constructor(private vehiService:VehiculoService, private serviModal: NgbModal) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Vehiculo" },
      { label: "Listar", active: true },
    ];
    this.obtenerVehiculos();
  }

  obtenerVehiculos(){
    this.vehiService.getVehiculos().subscribe((resp) => {
      this.vehiculos = resp;
    });
  }

  abrirModal(leyenda: string) {
    const modalRef = this.serviModal.open(ModalComponent, {
      size: "xl",
      centered: true,
      backdrop: "static" as "static",
    });
    modalRef.componentInstance.titulo = leyenda;
  }
}
