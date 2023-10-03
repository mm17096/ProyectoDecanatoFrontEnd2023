import { Injectable } from '@angular/core';
import { ISolicitudVehiculo } from '../../solicitud-vehiculo/interfaces/data.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private urlbase= environment.baseUrl;

  listSoliVehiculo : ISolicitudVehiculo [] = [];

    private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getSolicitudV(){
    return this.http.get<ISolicitudVehiculo[]>(this.urlbase+'/solicitudvehiculo/todas');
  }

  getSoli2(){
  
    this.http
    .get(`${this.urlbase}/solicitudvehiculo/todas`)
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

    getSoli3(){
      return
      this.http
      .get(`${this.urlbase}/solicitudvehiculo/todas`)
      .pipe(map((resp: any) => resp as ISolicitudVehiculo[], error => console.error(error)))
    }
}
