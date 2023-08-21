import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  url = 'http://localhost:8081/cargo';

  constructor(private http : HttpClient) { }

  getCargos(estado : number) : Observable<unknown[]> {

    return this.http.get<unknown[]>(`${this.url}/listar/${estado}`);
  }

  saveCargos(data : unknown){
    //console.log(data.type)
    return this.http.post(`${this.url}`,data);
  }

  getCargobyId(code : any) {
    return this.http.get(`${this.url}/${code}`);
  }

  editCargo( codigo : number, nombre : any, precio : any, tipo : any, foto : any){

    return this.http.put(this.url,{"codigoProducto": codigo, "nombre": nombre, "precio": precio, "tipo": tipo, "foto" : foto});
  }

  deleteCargo(code : any){
    return this.http.delete(`${this.url}/${code}`);
  }

}
