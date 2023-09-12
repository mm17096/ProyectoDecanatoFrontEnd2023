import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudVv } from '../Interfaces/SolicitudVv';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:8080/api/consulta'
  
  getCliente(){
    return this.http.get<SolicitudVv>(this.url+'/listapage');
  }

 /* createCliente(cliente:Cliente){
    return this.http.post<Cliente>(this.url+'/add',cliente);
 }

 getClienteId(id:number){
    return this.http.get<Cliente>(this.url+'/'+id)
 }

 updateCliente(cliente:Cliente){
   return this.http.put<Cliente>(this.url+'/update/'+cliente.idCliente,cliente);
 }

 deleteCliente(cliente:Cliente){
   return this.http.delete<Cliente>(this.url+'/delete/'+cliente.idCliente);
 }*/
}
