import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPaginacion } from 'src/app/shared/models/IPaginacion.interface';
import { environment } from 'src/environments/environment';
import { ISolicitudvalep } from '../interface/solicitudvalep.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudvaleService {



  private baseUrl: string = environment.baseUrl;

  listSolcitudes: IPaginacion<ISolicitudvalep> = {
    content: [],
    pageable: {
      offset: 0,
      paged: true,
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: true,
        sorted: true,
        unsorted: true,
      },
      unpaged: true,
    },
    empty: true,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    size: 0,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true,
    },
    totalElements: 0,
    totalPages: 0,
  };

  constructor(private http: HttpClient) { }

  getSolicitudes(page:number=0,size:number=10) {
    this.http
      .get<IPaginacion<ISolicitudvalep>>(`${this.baseUrl}/asignacionvale/listarsolicitudvale`,{
        params:{
          page:page.toString(),
          size:size.toString()
        }
      })
      .subscribe(
        (data) => {
          this.listSolcitudes = data;
        },
        (error) => {
          console.error("Error al obtener las Solicitudes:", error);
        }
      );
  }
}
