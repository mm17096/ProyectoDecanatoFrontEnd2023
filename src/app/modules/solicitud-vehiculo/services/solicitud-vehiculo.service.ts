import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEstados, IMotorista, IPais, ISolicitudVehiculo} from "../interfaces/data.interface";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {IVehiculos} from "../../vehiculo/interfaces/vehiculo-interface";

@Injectable({
  providedIn: 'root'
})
export class SolicitudVehiculoService {

  private url= environment.baseUrl;

  listSoliVehiculo : ISolicitudVehiculo [] = [];
  listSoliVehiculoRol : ISolicitudVehiculo [] = [];
  listVehiculos: IVehiculos [] = [];
  listMotorista: IMotorista[] = [];

  constructor(private http: HttpClient) { }

  // Servicio para obtener todas las solicitudes de vehiculo

  getSolicitudesVehiculo(estado: number) {
    if (estado != null){
      this.http
        .get(`${this.url}/solicitudvehiculo/lista/${estado}`)
        .pipe(map((resp: any) => resp as ISolicitudVehiculo[]))
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
        .get(`${this.url}/solicitudvehiculo/lista`)
        .pipe(map((resp: any) => resp as ISolicitudVehiculo[]))
        .subscribe(
          (soliVe: ISolicitudVehiculo[]) => {
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
      .get(`${this.url}/vehiculo/listasinpagina`)
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

  obtenerMotoristas() {
    this.http
      .get(`${this.url}/empleado/lista`)
      .pipe(map((resp: any) => resp.content as IMotorista[]))
      .subscribe(
        (empleados: IMotorista[]) => {
          console.log(empleados);
          this.listMotorista = empleados; // Actualiza la propiedad listEmpleados
        },
        (error) => {
          console.error("Error al obtener los empleados:", error);
        }
      );
    }

  filtroPlacasVehiculo(clase: string,fechaSalida:string,fechaEntrada:string): Observable<IVehiculos[]> {
    return this.http
      .get(`${this.url}/vehiculo/disponibilidad?claseName=${clase}&fechaSalida=${fechaSalida}&fechaEntrada=${fechaEntrada}`)
      .pipe(map((resp: any) => resp as IVehiculos[]));
  }


  public getDepa(): Observable<IPais[]>{
    return this.http.get<IPais[]>("assets/pais/ubicacionPaisSV2023.json");
  }


  registrarSoliVe(solicitudVehiculo: ISolicitudVehiculo){
    return this.http.post<ISolicitudVehiculo>( `${this.url}/solicitudvehiculo/insert`, solicitudVehiculo);
  }

  enviarPdfPasajeros(multiPart: FormData){
    console.log("docus:", multiPart);
    return this.http.post<any>(`${this.url}/documentosoli/upload`, multiPart);
  }

  updateSolicitudVehiculo(data: ISolicitudVehiculo){
    return this.http.put<ISolicitudVehiculo>( `${this.url}/solicitudvehiculo/edit/${data.codigoSolicitudVehiculo}`, data);
  }

  getSolicitudesRol(rol: string){
    this.http
        .get(`${this.url}/solicitudvehiculo/listado/${rol}`)
        .pipe(map((resp: any) => resp as ISolicitudVehiculo[]))
        .subscribe(
          (soliVe: ISolicitudVehiculo[]) => {
            this.listSoliVehiculoRol = soliVe;
          },
          (error) => {
            console.log("Error al obtener las solicitudes de vehiculo", error);
          }
        );
  }
}
