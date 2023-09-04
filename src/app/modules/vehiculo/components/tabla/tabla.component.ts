import { Component, Input, OnInit } from '@angular/core';
import { IVehiculos } from '../../interfaces/vehiculo-interface';
import { VehiculoService } from '../../service/vehiculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() vehiculos: IVehiculos[] = [];

  constructor(private vehiService:VehiculoService, private serviModal: NgbModal) { }

  ngOnInit(): void {

  }

  abrirModal(leyenda: string, objVehiculo:IVehiculos) {
    const modalRef = this.serviModal.open(ModalComponent, {
      size: "xl",
      centered: true,
      backdrop: "static" as "static",
    });
    modalRef.componentInstance.titulo = leyenda;
    modalRef.componentInstance.objVehiculo = objVehiculo;
  }

  cambiarEstado(vehiculoED: IVehiculos, estado: number) {
    
  }



}
