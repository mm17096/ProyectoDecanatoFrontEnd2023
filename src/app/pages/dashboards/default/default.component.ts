import { Component, OnInit, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';
import { IEmpleado } from 'src/app/modules/empleado/interface/empleado.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceService } from 'src/app/modules/solicitudes/Service/service.service';
import { IExistenciaVales } from 'src/app/modules/solicitudes/Interfaces/existenciavales.interface';
import { DataCards, Empleado } from 'src/app/account/auth/models/usuario.models';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isVisible: string;
  storage: Storage = window.localStorage;
  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string;

  fotoEmpleado!: string;
  usuario!: string;
  imagenBlob: Blob | null = null;
  imagenURL: any; // Variable para almacenar la URL de la imagen
  existenciaI!: IExistenciaVales; //para vales disponibles
  usuariojson: any;

  constructor(
    private usuarioService: UsuarioService,
    ) {}

  ngOnInit() {
    this.fotoEmpleado =  this.usuarioService.empleadofoto;
    this.usuariojson = this.usuarioService.usuarioJSON;
    this.usuarioService.getCards(); // aqui optengo las cards del admin 
  }




  /* Metodos para optener datos de cards */
  get cards(): DataCards | null {
      return this.usuarioService.cards;
  }

  get empleado(): Empleado | null {
    const usuarioString = this.storage.getItem("usuario");
    if (usuarioString) {
      const usuarioObj = JSON.parse(usuarioString);
      return usuarioObj.empleado;
    }
    return null;
  }

  get fotoempleado(): string | null {
    const foto = this.storage.getItem("empleadoFoto");
    if (foto) {
      return foto;
    }
    return "./../../../assets/images/Default-Avatar.png";
  }
  /* Metodos para optener datos de cards */
}
