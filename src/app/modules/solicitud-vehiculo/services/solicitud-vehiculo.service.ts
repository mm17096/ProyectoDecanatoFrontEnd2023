import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEstados, IPais, ISolicitudVehiculo} from "../interfaces/data.interface";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {IVehiculos} from "../../vehiculo/interfaces/vehiculo-interface";

@Injectable({
  providedIn: 'root'
})
export class SolicitudVehiculoService {

  private url= environment.baseUrl;

  listSoliVehiculo : ISolicitudVehiculo [] = [];
  listVehiculos: IVehiculos [] = [];

  constructor(private http: HttpClient) { }

  // Servicio para obtener todas las solicitudes de vehiculo

  getSolicitudesVehiculo(estado: number) {
    if (estado != null){
      this.http
        .get(`${this.url}/solicitudvehiculo/listapage/${estado}`)
        .pipe(map((resp: any) => resp.content as ISolicitudVehiculo[]))
        .subscribe(
          (soliVe: ISolicitudVehiculo[]) => {
            this.listSoliVehiculo = soliVe;
          },
          (error) => {
            console.log("Error al obtener las solicitudes de vehiculo", error);
          }
        );
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

  obtenerVehiculos() {
    this.http
      .get(`${this.url}/api/vehiculo/listasinpagina`)
      .pipe(map((resp: any) => resp as IVehiculos[]))
      .subscribe(
        (vehiculo: IVehiculos[])=> {
          this.listVehiculos = vehiculo;
        },
        (error) => {
          console.log("Error al obtener los vehiculos", error);
          }
        );
  }

  filtroPlacasVehiculo(clase: string): Observable<IVehiculos[]> {
    return this.http
      .get(`${this.url}/api/vehiculo/clase/${clase}`)
      .pipe(map((resp: any) => resp as IVehiculos[]));
  }


  public getDepa(): Observable<IPais[]>{
    return this.http.get<IPais[]>("assets/pais/ubicacionPaisSV2023.json");
  }


  registrarSoliVe(solicitudVehiculo: ISolicitudVehiculo){
    return this.http.post<ISolicitudVehiculo>( `${this.url}/solicitudvehiculo/insert`, solicitudVehiculo);
  }
}
