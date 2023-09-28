import { Component, OnInit, Input } from '@angular/core';
import { IVehiculoentradaSalida, IsolicitudVehiculo } from '../../interface/VehiculoEntradasalida';
import { ListaentradasalidaService } from '../../service/listaentradasalida.service';
import { IEntradaSalida } from '../../interface/EntSalinterface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  //BOTONES BOLEANOS


  //@Input() obj!:IVehiculoentradaSalida;
  @Input() obje:IsolicitudVehiculo;
  @Input() queryString: string;
  @Input() entraoOd!: IVehiculoentradaSalida[];
  //objetos:IVehiculoentradaSalida[]=[];//array de vehiculos
  objetivoMision: IsolicitudVehiculo;
  controlador1:boolean;
  controlador2:boolean;
  entradaSalida:IEntradaSalida;
  controllerdata:boolean;

  constructor(private listaentradasalidaservice: ListaentradasalidaService) { }
  ngOnInit(): void {
    if(this.obje.estado==5){
      this.controlador1=true;
      this.controlador2=false;
    }


    this.listaentradasalidaservice.listarEstado('1', this.obje.codigoSolicitudVehiculo).subscribe({
      next: (value)=>{
        this.entradaSalida=value;
        this.controllerdata=true;

        if(this.entradaSalida!=null){
          if(this.entradaSalida.estado==1){
          this.controlador1=false;
          this.controlador2=true;
          }
        }else{

          this.controllerdata=false;
        }

      }
    });


  }



}
