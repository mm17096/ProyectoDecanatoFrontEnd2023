import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  url = 'http://localhost:8080/api/cargo';

  constructor(private http : HttpClient) { }

  getCargos(estado : number) : Observable<unknown[]> {

    return this.http.get<unknown[]>(`${this.url}/listar/${estado}`);
  }

  getCargosAll(){
    return this.http.get<unknown[]>(`${this.url}`);
  }

  saveCargos(data : any){
    //console.log(data.type)
    return this.http.post(`${this.url}`,data);
  }

  getCargobyId(code : any) {
    return this.http.get(`${this.url}/${code}`);
  }

  editCargo(id: string, data : unknown){

    return this.http.put(`${this.url}/${id}`,data);
  }

  deleteCargo(code : any){
    return this.http.delete(`${this.url}/${code}`);
  }

}
