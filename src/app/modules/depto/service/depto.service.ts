import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepto } from '../interface/depto';

@Injectable({
  providedIn: 'root'
})
export class DeptoService {
  url = 'http://localhost:8080/depto';

  constructor(private http : HttpClient) { }

  getDeptos(estado : number) : Observable<unknown[]> {

    return this.http.get<unknown[]>(`${this.url}/listar/${estado}`);
  }

  saveDepto(data : IDepto){
    //console.log(data.type)
    return this.http.post(`${this.url}`,data);
  }

  getDeptobyId(code : any) {
    return this.http.get(`${this.url}/${code}`);
  }

  editDepto( data : IDepto){

    return this.http.put(this.url,data);
  }

  deleteCargo(code : any){
    return this.http.delete(`${this.url}/${code}`);
  }

}
