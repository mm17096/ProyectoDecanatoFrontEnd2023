import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consulta } from '../../Interfaces/CompraVale/Consulta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConsultaExcelTabla, ITablaConsulta } from '../../Interfaces/CompraVale/excel';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:8080/api'
  getCliente(){
    return this.http.get<Consulta>(this.url+'/consulta');
  }

  
  getConsultaExporExcel(): Observable<IConsultaExcelTabla>{
    return this.http.get<Consulta[]>(this.url+'/consulta')
    .pipe(map((resp:Consulta[]) => {
    resp.length = 20;
    const dataExcel: IConsultaExcelTabla ={
      tablaConsulta: this.getConsultaTabla(resp)
       };
      return dataExcel;
      })
    );
  }
   
  private getConsultaTabla(response: Consulta[]): ITablaConsulta[]{
    return response.map((item:Consulta) =>({
      codigoVale1: `${item.valeId}`,
      entradasCant:`${item.idAsignacionVale}`,
      entradasPU:`${item.cantidad}`,
      entradasTotal:`${item.cantidad}`,
      solidasCant:`${item.cantidad}`,
      salidasPU:`${item.cantidad}`,
      salidadTotal:`${item.cantidad}`,
      ExistCant:`${item.cantidad}`,
      ExistPU:`${item.cantidad}`,
      ExistTotal:`${item.cantidad}`,
      fecha:`${item.fechaAsignacion}`,
    }));
  }
}
