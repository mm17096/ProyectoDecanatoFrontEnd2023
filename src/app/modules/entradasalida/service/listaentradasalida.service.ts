import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntradaSalidaI, IEntradaSalida, IsolicitudVehiculo } from '../interface/EntSalinterface';
import { Observable } from 'rxjs';
import { IVehiculoentradaSalida } from '../interface/VehiculoEntradasalida';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaentradasalidaService {
  private baseUrl: string = environment.baseUrl;

  listDeMisiones: IsolicitudVehiculo[] = [];
  constructor(private http: HttpClient) { }

  getMisiones() {
    this.http
    
      .get(`${this.baseUrl}/api/solicitudvehiculo/lista`)
      
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
    return this.http.get<IEntradaSalida[]>(`${this.baseUrl}/api/entradasalida`);
  }



  NuevosDatos(entrasali: EntradaSalidaI): any {
    return this.http.post(`${this.baseUrl}/api/entradasalida/insertar`,entrasali);
  }

  public putEntradasalida(entrasali: EntradaSalidaI): Observable<Object> {
    return this.http.put(`${this.baseUrl}/api/entradasalida/{{id}}`,entrasali);
  }
  public putEmpleado(ent: IEntradaSalida): any {
    return this.http.put(`${this.baseUrl}/api/entradasalida/editar/${ent.id}`, ent);
  }


  buscarVehiculo(termino:string):Observable<IVehiculoentradaSalida[]>{
    if(termino.length>1){
      return this.http.get<IVehiculoentradaSalida[]>(`${this.baseUrl}/api/vehiculo/listasinpagina/${termino}`);
    }else{
      return this.http.get<IVehiculoentradaSalida[]>(`${this.baseUrl}/api/vehiculo/listasinpagina`);
    }
  } 


  
}
