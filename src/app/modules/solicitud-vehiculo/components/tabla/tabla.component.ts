import {Component, Input, OnInit} from '@angular/core';
import {ISolicitudVehiculo} from "../../interfaces/data.interface";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";
import { ModalSecretariaComponent } from '../modal-secretaria/modal-secretaria.component';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() solicitudesVehiculo!: ISolicitudVehiculo[];
  @Input() opc!: string;
  @Input() term!: any; // para buscar
  p: any; // paginacion
  selectedData: any; // Almacena los datos del registro seleccionado
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("ver: ",this.solicitudesVehiculo)
  }

  abrirModal(leyenda: string, data: any) {
    this.selectedData = data; // Almacena los datos del registro seleccionado
    const modalRef = this.modalService.open(ModalComponent, {size:'xl', backdrop: 'static'});
    modalRef.componentInstance.leyenda = leyenda; // Pasa la leyenda al componente modal
    modalRef.componentInstance.soliVeOd = data; // Pasa la data al componente modal
  }

  abrirModalSecre(leyenda: string, data: any) {
    this.selectedData = data;
    const modalRef = this.modalService.open(ModalSecretariaComponent, {size:'xl', backdrop: 'static'});
    modalRef.componentInstance.leyenda = leyenda;
    modalRef.componentInstance.soliVeOd = data;
  }

  calcularNumeroCorrelativo(index: number): number {
    if (typeof this.p === 'number') {
      return (this.p - 1) * 10 + index + 1;
    } else {
      return index + 1; // Si no es numérico, solo regresamos el índice + 1
    }
  }

}
