import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IDocumentosvale, valeDocumentosI } from '../interface/IDocumentosvale';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  //url='http://localhost:8080/document';
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public NuevosDatos(document: IDocumentosvale, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('document', JSON.stringify(document));
    return this.http.post(`${this.url}/document/insertar`, formData);
  }

}
