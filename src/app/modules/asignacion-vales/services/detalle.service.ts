import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaginacion } from '../../../shared/moedels/IPaginacion.interface';
import { IDetalleAsignacion } from '../interfaces/detatalle-asignacion.interface';
@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  listDetalle:IPaginacion<IDetalleAsignacion> = {
    content: [],
    pageable: {
      sort: {
        empty: true,
        unsorted: true,
        sorted: true,
      },
      offset: 0,
      pageSize: 0,
      pageNumber: 0,
      paged: true,
      unpaged: true,
    },
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    sort: {
      empty: true,
      unsorted: true,
      sorted: true,
    },
    empty: true,
    first: true,
    numberOfElements: 0,
  };

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/detalleasignacionVale'

  public getDetalleAsignacionValePage(page: number = 0, size: number = 10) {
    return this.http.get<IPaginacion<IDetalleAsignacion>>(`${this.url}?page=${page}&size=${size}`).subscribe((resp) =>{
      console.log(resp);
      this.listDetalle = resp;
    });
  }

}
