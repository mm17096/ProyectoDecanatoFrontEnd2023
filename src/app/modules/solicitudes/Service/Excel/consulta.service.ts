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
  url = 'http://localhost:8080/api/consulta'
  getCliente(){
    return this.http.get<Consulta>(this.url+'/listaconsulta');
  }

  
  getConsultaExporExcel(): Observable<IConsultaExcelTabla>{
    return this.http.get<Consulta[]>(this.url+'/listaconsulta')
    .pipe(map((resp) => {
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
      codigoVale: item.vale.correlativo,
      entradasCant:item.vale.compra.cantidad,
      entradasPU:item.vale.compra.precio_unitario,
      entradasTotal:item.estado,
      solidasCant:item.solicitudVale.cantidadVale,
      salidasPU:item.vale.compra.precio_unitario,
      salidadTotal:item.estado,
      ExistCant:item.estado,
      ExistPU:item.vale.compra.precio_unitario,
      ExistTotal:item.estado,
      fecha:item.fecha,
      estado:item.vale.estado,
      fechacompra:item.vale.compra.fecha_compra,
      precio:item.vale.compra.precio_unitario,
      cantidad:item.vale.compra.cantidad,
      idcompra:item.vale.compra.id,
    }));
  }
}
