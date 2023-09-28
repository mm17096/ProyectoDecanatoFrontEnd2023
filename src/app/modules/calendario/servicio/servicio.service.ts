import { Injectable } from '@angular/core';
import { ISolicitudVehiculo } from '../../solicitud-vehiculo/interfaces/data.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private urlbase= environment.baseUrl;

    private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getSolicitudV(){
    return this.http.get<ISolicitudVehiculo[]>(this.urlbase+'/solicitudvehiculo/todas');
  }


}
