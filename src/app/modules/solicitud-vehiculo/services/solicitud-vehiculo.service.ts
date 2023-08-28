import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISolicitudVehiculo} from "../interfaces/data.interface";
import {ISolicitudVehiculo2} from "../interfaces/solive.interface";
import {IEstados} from "../interfaces/estados.interface";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SolicitudVehiculoService {

  private url= environment.baseUrl+'/solicitudvehiculo';

  listSoliVehiculo : ISolicitudVehiculo2 [] = [];

  constructor(private http: HttpClient) { }

  // Servicio para obtener todas las solicitudes de vehiculo
  public obtenerSolicitudes(): Observable<any> {
    return this.http.get<ISolicitudVehiculo2>((this.url)+ '/listadto');
  }

  /*getSolicitudesVehiculo() {
    this.http
      .get(`${this.url}/listapage`)
      .pipe(map((resp: any) => resp.content as ISolicitudVehiculo2[]))
      .subscribe(
        (soliVe: ISolicitudVehiculo2[]) => {
          //console.log(soliVe);
          this.listSoliVehiculo = soliVe;
        },
        (error) => {
          console.log("Error al obtener las solicitudes de vehiculo", error);
        }
      )
  }*/

  // Servicio para obtener los estados
  public obtenerEstados(): Observable<any> {
    return this.http.get<IEstados>((this.url)+ '/estados');
  }

  // Servicio para filtrar las solicitudes por estado
  public obtenerSoliVePorEstado(estado: number): Observable<any> {
    return  this.http.get<ISolicitudVehiculo>( (this.url) + `/listadtoestado/${estado}` );
  }
}
