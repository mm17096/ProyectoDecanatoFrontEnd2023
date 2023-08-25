import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntradaSalidaI, IEntradaSalida } from '../interface/EntSalinterface';

@Injectable({
  providedIn: 'root'
})
export class ListaentradasalidaService {
  url='http://localhost:8081/entradasalida';

  constructor(private http: HttpClient) { }


  get ObtenerLista() {
    return this.http.get<IEntradaSalida[]>(`${this.url}`);
  }


  NuevosDatos(entrasali: EntradaSalidaI): any {
    return this.http.post(`${this.url}/insertar`,entrasali);
  }
}
