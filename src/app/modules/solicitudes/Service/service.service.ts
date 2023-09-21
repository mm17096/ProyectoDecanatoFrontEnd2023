import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  IAsignacionVale,
  ICodigoAsignacion,
  IValesAsignar,
} from "../Interfaces/asignacionvale.interface";
import {
  IExistenciaVales,
  ISolicitudValeID,
} from "../Interfaces/existenciavales.interface";
import { ISolicitudValeAprobar } from '../Interfaces/solicitudValeAprobar.interface';
import { SolicitudVv } from "../Interfaces/SolicitudVv";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  private baseUrl: string = environment.baseUrl;
  listSolicitudes: ISolicitudValeAprobar;
  constructor(private http: HttpClient) {}

  getCliente() {
    return this.http.get<SolicitudVv>(this.baseUrl + "/consulta/listapage");
  }

  getCantidadVales() {
    return this.http.get<IExistenciaVales>(
      this.baseUrl + "/asignacionvale/cantidadvales"
    );
  }

  getIdSolicitudVale(codigoSolicitudVale: string) {
    return this.http.get<ISolicitudValeID>(
      `${this.baseUrl}/asignacionvale/solitudvale/${codigoSolicitudVale}`
    );
  }

  insertar(asignacionVale: IAsignacionVale) {
    console.log("en el servicio:" + asignacionVale);

    return this.http.post<IAsignacionVale>(
      `${this.baseUrl}/asignacionvale/insertar`,
      asignacionVale
    );
  }

  getValesAignar(cantidadVales: number) {
    return this.http.get<IValesAsignar>(
      `${this.baseUrl}/asignacionvale/listarvalesasignar/${cantidadVales}`
    );
  }

  getCodigoAsignacion(codigoSolitudVale: string) {
    return this.http.get<ICodigoAsignacion>(
      `${this.baseUrl}/asignacionvale/codigoasignacionvale/${codigoSolitudVale}`
    );
  }

  //Consulta las solitudes de vale por estado
  getSolicitdValePorEstado(estado: number) {
    return this.http.get<ISolicitudValeAprobar>(
      `${this.baseUrl}/asignacionvale/listarsolicitudvaleestado/${estado}`
    );
  }
}
