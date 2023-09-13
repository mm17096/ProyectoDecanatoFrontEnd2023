import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IAsignacionDetalle } from '../interfaces/asignacion.interface';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DetalleService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getDetalleAsignacionVale(codigoAsignacion: string) {
    return this.http.get<IAsignacionDetalle>(`${this.baseUrl}/api/asignacionvale/listar/${codigoAsignacion}`);
  }
}
