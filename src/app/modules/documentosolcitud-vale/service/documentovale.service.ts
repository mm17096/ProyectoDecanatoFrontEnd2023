import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDocumentosvale } from '../interface/IDocumentosvale';

@Injectable({
  providedIn: 'root'
})
export class DocumentovaleService {
  url='http://localhost:8080/document';

  constructor(private http: HttpClient) { }

  get ObtenerLista() {
    return this.http.get<IDocumentosvale[]>(`${this.url}`);
  }
}
