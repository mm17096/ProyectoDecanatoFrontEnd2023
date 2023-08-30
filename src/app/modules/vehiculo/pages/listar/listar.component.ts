import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  termBusca: string;

  constructor(private serviModal: NgbModal) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Vehiculo" },
      { label: "Listar", active: true },
    ];
  }

  abrirModal(leyenda: string) {
    const modalRef = this.serviModal.open(ModalComponent, {
      size: "xl",
      centered: true,
      backdrop: "static" as "static",
    });
    modalRef.componentInstance.leyenda = leyenda;
  }
}
