import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntradaSalidaI, IEntradaSalida } from '../interface/EntSalinterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaentradasalidaService {
  url='http://localhost:8080/entradasalida';

  constructor(private http: HttpClient) { }


  get ObtenerLista() {
    return this.http.get<IEntradaSalida[]>(`${this.url}`);
  }


  NuevosDatos(entrasali: EntradaSalidaI): any {
    return this.http.post(`${this.url}/insertar`,entrasali);
  }

  public putEntradasalida(entrasali: EntradaSalidaI): Observable<Object> {
    return this.http.put(`${this.url}/{{id}}`,entrasali);
  }
}
