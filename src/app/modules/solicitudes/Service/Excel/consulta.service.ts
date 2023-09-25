import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompraDto, Consulta, ConsultaDto, IConsultaDelAl } from '../../Interfaces/CompraVale/Consulta';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IConsultaExcelTabla, IConsultaExcelTablaC, IConsultaExcelTablaCompraDto, IConsultaExcelTablaDto, ITablaConsulta, ITablaConsultaC, ITablaConsultaCompraDto, ITablaConsultaDto } from '../../Interfaces/CompraVale/excel';
import { ICompra } from 'src/app/modules/compra/interfaces/compra.interface';
import { environment } from "src/environments/environment";
import { IVale } from 'src/app/modules/devolucion-vale/interfaces/vale.interface';
import { Vale } from '../../Interfaces/CompraVale/Vale';
import { Compra } from '../../Interfaces/CompraVale/Compra';
import { ISolicitudVehiculo } from 'src/app/modules/solicitud-vehiculo/interfaces/data.interface';
import { Usuario, Empleado } from 'src/app/account/auth/models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  listCompra: ICompra[] = [];
  listVales: IConsultaDelAl[] =  [];
  private urlbase= environment.baseUrl;
  storage: Storage = window.localStorage;
  public empleado!: Empleado;

  constructor(private http:HttpClient) { }
  url = 'http://localhost:8080/api/consulta'
  private baseUrl: string = environment.baseUrl;
  getCliente(){
    return this.http.get<Consulta>(this.url+'/listaconsulta');
  }

  getConsultaValeDto(fechaI:Date, fechaF:Date){
    return this.http.get<Consulta>(this.url+'/listarconsultadto?fechaI='+fechaI+'&fechaF='+fechaF);
  }

  getConsultaCompraValeDto(fechaI:Date, fechaF:Date){
    return this.http.get<Consulta>(this.url+'/listarcompradto?fechaI='+fechaI+'&fechaF='+fechaF);
  }

  getConsultaValeGDto(fechaI:Date, fechaF:Date): Observable<IConsultaExcelTablaDto>{
    return this.http.get<ConsultaDto[]>(this.url+'/listarconsultadto?fechaI='+fechaI+'&fechaF='+fechaF)
     .pipe(map((resp)=> {
      resp.length = 2000;
      const dataExcel: IConsultaExcelTablaDto ={
        tablaConsultaConsulta: this.getConsultaTablaConsulta(resp)
      };
      return dataExcel;
     })
     );
  }
  private getConsultaTablaConsulta(response: ConsultaDto[]): ITablaConsultaDto[]{
    return response.map((item:ConsultaDto) =>({
      valor:item.valor,
      fecha:item.fecha,
      correlativo:item.correlativo,
      estadosv:item.estadosv,
      estadoentrada:item.estadoentrada,
      estadoav:item.estadoav,
      cantidadvale:item.cantidadvale,
      estadovale:item.estadovale,
      fechavencimiento:item.fechavencimiento,
      iddetalleasignacionvale:item.iddetalleasignacionvale,
      idasignacionvale:item.idasignacionvale,
      valeid:item.valeid,
      solicitudvehiculoid:item.solicitudvehiculoid,
    }));
  }

  getConsultaCompraValeGDto(fechaI:Date, fechaF:Date): Observable<IConsultaExcelTablaCompraDto>{
    return this.http.get<CompraDto[]>(this.url+'/listarcompradto?fechaI='+fechaI+'&fechaF='+fechaF)
    .pipe(map((resp)=> {
     resp.length = 2000;
     const dataExcel: IConsultaExcelTablaCompraDto ={
       tablaConsultaCompra: this.getConsultaTablaCompra(resp)
     };
     return dataExcel;
    })
    );
  }

  private getConsultaTablaCompra(response: CompraDto[]): ITablaConsultaCompraDto[]{
    return response.map((item:CompraDto) =>({
      cantidad:item.cantidad,
    codigofin:item.codigofin,
    fechacompra:item.fechacompra,
    codigocompra:item.codigocompra,
    preciounitario:item.preciounitario,
    codigoinicio:item.codigoinicio,
    fechavencimientovale:item.fechavencimientovale,
    }));
  }
  getCompras() {
    this.http
      .get(`${this.baseUrl}/compra/listasinpagina`)
      .pipe(map((resp: any) => resp as ICompra[]))
      .subscribe((compras: ICompra[]) => {
        this.listCompra = compras;
      });
  }
  getCompraC(): Observable<IConsultaExcelTablaC>{
     return this.http.get<Compra[]>(this.baseUrl+'/compra/listasinpagina?orderBy=fecha_compra:asc')
     .pipe(map((resp)=> {
      resp.length = 2000;
      const dataExcel: IConsultaExcelTablaC ={
        tablaConsultaC: this.getConsultaTablaC(resp)
      };
      return dataExcel;
     })
     );
  }
  private getConsultaTablaC(response: Compra[]): ITablaConsultaC[]{
    return response.map((item:Compra) =>({
      id:item.id,
      cantidad:item.cantidad,
      cod_inicio:item.cod_inicio,
      cod_fin:item.cod_fin,
      fecha_compra:item.fecha_compra,
      fecha_vencimiento:item.fecha_vencimiento,
      precio_unitario:item.precio_unitario
    }));
  }

  getConsultaExporExcel(): Observable<IConsultaExcelTabla>{
    return this.http.get<Consulta[]>(this.url+'/listaconsulta')
    .pipe(map((resp) => {
    resp.length = 2000;
    //console.log(resp);
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
      ExistCant:item.solicitudVale.cantidadVale,
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
  getSolicitudV(){
    return this.http.get<ISolicitudVehiculo[]>(this.urlbase+'/solicitudvehiculo/todas');
  }

  getConsultaSolicitudVDelAl(id:string){
   /* this.http
    .get(`${this.url}/listarvalesdelal/`+id)
    .pipe(map((resp: any) => resp as IConsultaDelAl[]))
    .subscribe(
      (vales: IConsultaDelAl[])=> {
        this.listVales = vales;
      },
      (error) => {
        console.log("Error al obtener los vales", error);
        }
      );*/
   //return this.listVales;
    return this.http.get<IConsultaDelAl[]>(this.url+'/listarvalesdelal/'+id);
  }
  
  get codEmpleado(): string {
    return this.storage.getItem("codEmpleado" || "");
  }

  getEmpleado(): Observable<Empleado> {
    return this.http
      .get(`${this.baseUrl}/empleado/${this.codEmpleado}`)
      .pipe(
        tap((empleado: any) => {
          const { codigoEmpleado, dui, nombre, apellido, telefono, licencia, tipolicencia, fechalicencia, estado, jefe, correo, nombrefoto, urlfoto, cargo, departamento } = empleado;
          const usuarioObj = new Empleado(codigoEmpleado, dui, nombre, apellido, telefono, licencia, tipolicencia, fechalicencia, estado, jefe, correo, nombrefoto, urlfoto, cargo, departamento);
          console.log(usuarioObj);
          return usuarioObj;
        })
      );

  }
}
