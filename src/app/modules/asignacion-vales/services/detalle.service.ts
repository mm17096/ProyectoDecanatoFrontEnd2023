import { Injectable } from "@angular/core";
import { IAsignacionDetalle } from '../interfaces/asignacion.interface';
import { environment } from "src/environments/environment";

import { HttpClient } from '@angular/common/http';
import { IDocumentosvale} from '../interface/IDocumentosvale';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class DetalleService {

  //url='http://localhost:8080/document';
  private burl: string = environment.baseUrl;
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public NuevosDatos(document: IDocumentosvale, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('document', JSON.stringify(document));
    return this.http.post(`${this.burl}/document/insertar`, formData);
  }


  getDetalleAsignacionVale(codigoAsignacion: string) {
    return this.http.get<IAsignacionDetalle>(`${this.baseUrl}/asignacionvale/listar/${codigoAsignacion}`);
  }
}
