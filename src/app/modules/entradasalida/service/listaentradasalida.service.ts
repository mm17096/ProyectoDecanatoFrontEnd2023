import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EntradaSalidaI, IEntradaSalida, IsolicitudVehiculo } from '../interface/EntSalinterface';
import { Observable } from 'rxjs';
import { IVehiculoentradaSalida } from '../interface/VehiculoEntradasalida';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaentradasalidaService {
  private baseUrl: string = environment.baseUrl;///base url

  listDeMisiones: IsolicitudVehiculo[] = [];
  constructor(private http: HttpClient) { }

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
  


  get ObtenerLista() {
    return this.http.get<IEntradaSalida[]>(`${this.baseUrl}/entradasalida`);
  }



  NuevosDatos(entrasali: EntradaSalidaI): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const requestOptions = {
      headers: headers
    };
    return this.http.post(`${this.baseUrl}/entradasalida/insertar`,entrasali, requestOptions);
  }

  public putEntradasalida(entrasali: EntradaSalidaI): Observable<Object> {
    return this.http.put(`${this.baseUrl}/entradasalida/{{id}}`,entrasali);
  }
  public putEmpleado(ent: IEntradaSalida): any {
    return this.http.put(`${this.baseUrl}/entradasalida/editar/${ent.id}`, ent);
  }


  buscarVehiculo(termino: string): Observable<IVehiculoentradaSalida[]> {
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
      return this.http.get<IVehiculoentradaSalida[]>(`${this.baseUrl}/vehiculo/listasinpagina/${termino}`, requestOptions);
    } else {
      return this.http.get<IVehiculoentradaSalida[]>(`${this.baseUrl}/vehiculo/listasinpagina`, requestOptions);
    }
  }


  
}
