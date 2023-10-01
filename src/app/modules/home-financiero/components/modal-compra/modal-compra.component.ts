import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ICompra } from "src/app/modules/compra/interfaces/compra.interface";

@Component({
  selector: "app-modal-compra",
  templateUrl: "./modal-compra.component.html",
  styleUrls: ["./modal-compra.component.scss"],
})
export class ModalCompraComponent implements OnInit {
  @Input() compras!: ICompra[];
  @Input() texto!: string;

  @Input() queryString!: string;
  p: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openModal(content: any, compras: ICompra[]) {
    this.compras = compras;

    const modalOptions = {
      centered: true,
      size: "lg", // 'lg' para modal grande, 'sm' para modal pequeño
      backdrop: "static" as "static",
      keyboard: false, // Configura backdrop como 'static'
    };
    this.modalService.open(content, modalOptions);
  }
}
