import { Component, OnInit, Input } from '@angular/core';
import { IVehiculoentradaSalida, IsolicitudVehiculo } from '../../interface/VehiculoEntradasalida';
import { ListaentradasalidaService } from '../../service/listaentradasalida.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() obj!:IVehiculoentradaSalida;
  @Input() obje!:IsolicitudVehiculo;
  @Input() queryString: string;
  @Input() entraoOd!: IVehiculoentradaSalida[];
  
  
  constructor(private listaentradasalidaservice: ListaentradasalidaService) { }

  ngOnInit(): void {
  }



}
