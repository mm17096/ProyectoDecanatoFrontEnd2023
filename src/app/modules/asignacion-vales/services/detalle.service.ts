import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IAsignacionDetalle } from '../interfaces/asignacion.interface';

@Injectable({
  providedIn: "root",
})
export class DetalleService {




  url = "http://localhost:8080/asignacionvale/listar/cc0a3fa0-984e-4d10-9c11-deded04a3dae";
  constructor(private http: HttpClient) {}

  getDetalleAsignacionVale() {
    return this.http.get<IAsignacionDetalle>(this.url);
  }
}
