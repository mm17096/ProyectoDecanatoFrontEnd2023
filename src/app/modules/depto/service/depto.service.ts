import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeptoService {
  url = 'http://localhost:8081/depto';

  constructor(private http : HttpClient) { }

  getDeptos(estado : number) : Observable<unknown[]> {

    return this.http.get<unknown[]>(`${this.url}/listar/${estado}`);
  }

  saveDepto(data : unknown){
    //console.log(data.type)
    return this.http.post(`${this.url}`,data);
  }

  getDeptobyId(code : any) {
    return this.http.get(`${this.url}/${code}`);
  }

  editDepto( codigo : number, nombre : any, precio : any, tipo : any, foto : any){

    return this.http.put(this.url,{"codigoProducto": codigo, "nombre": nombre, "precio": precio, "tipo": tipo, "foto" : foto});
  }

  deleteCargo(code : any){
    return this.http.delete(`${this.url}/${code}`);
  }

}
