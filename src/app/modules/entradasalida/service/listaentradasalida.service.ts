import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EntradaSalidaI, IEntradaSalida } from '../interface/EntSalinterface';
import {  IsolicitudVehiculo } from '../interface/VehiculoEntradasalida';
import { Observable } from 'rxjs';
import { IVehiculoentradaSalida } from '../interface/VehiculoEntradasalida';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaentradasalidaService {
  private baseUrl: string = environment.baseUrl;///base url
  // Declarar requestOptions como una variable global
  private requestOptions: any;

  listDeMisiones: IsolicitudVehiculo[] = [];
  constructor(private http: HttpClient) { 
        // Recupera el token de acceso desde el local storage
        const token = localStorage.getItem('token');

        // Crea un objeto HttpHeaders para agregar el token de acceso en el encabezado 'Authorization'
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
    
        // Configura las opciones de la solicitud HTTP con los encabezados personalizados
        this.requestOptions = {
          headers: headers
        };
  }

  getMisiones() {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const requestOptions = {
      headers: headers
    };

    this.http.get(`${this.baseUrl}/solicitudvehiculo/lista`, requestOptions)
      
      .pipe(map((resp: any) => resp as IsolicitudVehiculo[]))
      .subscribe(
        (lista: IsolicitudVehiculo[]) => {
          console.log(lista);
          this.listDeMisiones = lista;
          console.log(lista);
        },
        (error) => {
          console.error("Error al obtener las misiones:", error);
        }
      );
  }
  


  get ObtenerLista(): Observable<IEntradaSalida[]> {
     // Recupera el token de acceso desde el local storage
     const token = localStorage.getItem('token');

     // Crea un objeto HttpHeaders para agregar el token de acceso en el encabezado 'Authorization'
     const headers = new HttpHeaders({
       Authorization: `Bearer ${token}`
     });
 
     // Configura las opciones de la solicitud HTTP con los encabezados personalizados
     const requestOptions = {
       headers: headers
     };
     
    return this.http.get<IEntradaSalida[]>(`${this.baseUrl}/entradasalida`, requestOptions);
  }



  NuevosDatos(entrasali: EntradaSalidaI): any {
    return this.http.post(`${this.baseUrl}/entradasalida/insertar`,entrasali);
  }

  public putEntradasalida(entrasali: EntradaSalidaI): Observable<Object> {
    return this.http.put(`${this.baseUrl}/entradasalida/{{id}}`,entrasali, this.requestOptions);
  }
  public putEmpleado(ent: IEntradaSalida): any {
    return this.http.put(`${this.baseUrl}/entradasalida/editar/${ent.id}`, ent, this.requestOptions);
  }


  buscarVehiculo(termino: string): Observable<IsolicitudVehiculo[]> {
    // Recupera el token de acceso desde el local storage
    const token = localStorage.getItem('token');

    // Crea un objeto HttpHeaders para agregar el token de acceso en el encabezado 'Authorization'
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Configura las opciones de la solicitud HTTP con los encabezados personalizados
    const requestOptions = {
      headers: headers
    };

    if (termino.length > 1) {
     return this.http.get<IsolicitudVehiculo[]>(`${this.baseUrl}/solicitudvehiculo/listasinpagina/${termino}`, requestOptions).pipe(
          map(vehiculos=>vehiculos.filter(vehiculos=>vehiculos.estado===4))
      );
    } else {
      return this.http.get<IsolicitudVehiculo[]>(`${this.baseUrl}/solicitudvehiculo/lista`, requestOptions).pipe(
        map(vehiculos=>vehiculos.filter(vehiculos=>vehiculos.estado===4))
      )
    }
  }

 /*obtenerImagenes(): Observable<IVehiculoentradaSalida[]> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const requestOptions = {
      headers: headers
    };
    return this.http.get<IVehiculoentradaSalida[]>(`${this.baseUrl}/vehiculo/listasinpagina`, requestOptions);
  }*/


  
}
