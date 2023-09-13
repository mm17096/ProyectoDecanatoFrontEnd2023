import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SolicitudVv } from '../Interfaces/SolicitudVv';
import { IExistenciaVales, ISolicitudValeID } from '../Interfaces/existenciavales.interface';
import { IAsignacionVale } from '../Interfaces/asignacionvale.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getCliente(){
    return this.http.get<SolicitudVv>(this.baseUrl+'/api/consulta/listapage');
  }

  getCantidadVales(){
    return this.http.get<IExistenciaVales>(this.baseUrl+'/api/asignacionvale/cantidadvales');
  }

  getIdSolicitudVale(codigoSolicitudVale: string){
    return this.http.get<ISolicitudValeID>(`${this.baseUrl}/api/asignacionvale/solitudvale/${codigoSolicitudVale}`);
  }

  insertar(asignacionVale: IAsignacionVale){
    console.log("en el servicio:" + asignacionVale);

    return this.http.post<IAsignacionVale>(`${this.baseUrl}/api/asignacionvale/insertar`, asignacionVale);
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
