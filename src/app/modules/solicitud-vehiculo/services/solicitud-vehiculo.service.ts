import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISolicitudVehiculo, IVehiculo} from "../interfaces/data.interface";
import {IEstados} from "../interfaces/estados.interface";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SolicitudVehiculoService {

  private url= environment.baseUrl;

  listSoliVehiculo : ISolicitudVehiculo [] = [];

  constructor(private http: HttpClient) { }

  // Servicio para obtener todas las solicitudes de vehiculo

  getSolicitudesVehiculo(estado: number) {
    console.log(estado);
    if (estado != null){
      this.http
        .get(`${this.url}/solicitudvehiculo/listapage/${estado}`)
        .pipe(map((resp: any) => resp.content as ISolicitudVehiculo[]))
        .subscribe(
          (soliVe: ISolicitudVehiculo[]) => {
            console.log("filtro:", soliVe);
            this.listSoliVehiculo = soliVe;
          },
          (error) => {
            console.log("Error al obtener las solicitudes de vehiculo", error);
          }
        )
    }else {
      this.http
        .get(`${this.url}/solicitudvehiculo/listapage`)
        .pipe(map((resp: any) => resp.content as ISolicitudVehiculo[]))
        .subscribe(
          (soliVe: ISolicitudVehiculo[]) => {
            //console.log(soliVe);
            this.listSoliVehiculo = soliVe;
          },
          (error) => {
            console.log("Error al obtener las solicitudes de vehiculo", error);
          }
        );
    }
  }

  // Servicio para obtener los estados
  public obtenerEstados(): Observable<any> {
    return this.http.get<IEstados>((this.url)+ '/solicitudvehiculo/estados');
  }

  public obtenerTipoVehiculo():Observable<any>{
    return this.http.get((this.url)+ `/api/vehiculo/listasinpagina`);
  }

  public registrarSoliVe(solicitudVehiculo: ISolicitudVehiculo): Observable<ISolicitudVehiculo>{
    return this.http.post<ISolicitudVehiculo>(this.url + `/solicitudvehiculo/insert`, solicitudVehiculo);
  }
}
