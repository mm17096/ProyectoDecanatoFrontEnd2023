import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISolicitudVehiculo} from "../interfaces/data.interface";
import {IEstados} from "../interfaces/estados.interface";

@Injectable({
  providedIn: 'root'
})
export class SolicitudVehiculoService {

  url= 'http://localhost:8080/solicitudvehiculo';

  constructor(private http: HttpClient) { }

  // Servicio para obtener todas las solicitudes de vehiculo
  public obtenerSolicitudes(): Observable<any> {
    return this.http.get<ISolicitudVehiculo>((this.url)+ '/listadto');
  }

  // Servicio para obtener los estados
  public obtenerEstados(): Observable<any> {
    return this.http.get<IEstados>((this.url)+ '/estados');
  }

  // Servicio para filtrar las solicitudes por estado
  public obtenerSoliVePorEstado(estado: number): Observable<any> {
    return  this.http.get<ISolicitudVehiculo>( (this.url) + `/listadtoestado/${estado}` );
  }
}
