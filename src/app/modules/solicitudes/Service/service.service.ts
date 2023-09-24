import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  IAsignacionVale,
  ICodigoAsignacion,
  IValesAsignar,
} from "../Interfaces/asignacionvale.interface";
import {
  IExistenciaVales,
  ISolicitudValeID,
} from "../Interfaces/existenciavales.interface";
import { ISolcitudAprobar, ISolicitudValeAprobar } from '../Interfaces/solicitudValeAprobar.interface';
import { SolicitudVv } from "../Interfaces/SolicitudVv";
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from "src/app/account/auth/models/usuario.models";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  private baseUrl: string = environment.baseUrl;
  listSolicitudes: ISolicitudValeAprobar;
  listSolicitudesValeRol: ISolicitudValeAprobar[];
  constructor(private http: HttpClient) {}

 /*  get codUsuario(): string {
    return localStorage.getItem("codUsuario" || "");
  }

  getUsuarioSV(): Observable<Usuario> {
    return this.http
      .get(`${this.baseUrl}/usuario/${this.codUsuario}`)
      .pipe(
        tap((usuario: any) => {
          const { codigoUsuario, nombre, clave, nuevo, role, token, empleado } = usuario;
          const usuarioObj = new Usuario(codigoUsuario, nombre, "", nuevo, role, token, empleado);
          return usuarioObj;
        })
      );
  } */

  getCliente() {
    return this.http.get<SolicitudVv>(this.baseUrl + "/consulta/listapage");
  }

  getCantidadVales() {
    return this.http.get<IExistenciaVales>(
      this.baseUrl + "/asignacionvale/cantidadvales"
    );
  }

  getIdSolicitudVale(codigoSolicitudVale: string) {
    return this.http.get<ISolicitudValeID>(
      `${this.baseUrl}/asignacionvale/solitudvale/${codigoSolicitudVale}`
    );
  }

  insertar(asignacionVale: IAsignacionVale) {
    console.log("en el servicio:" + asignacionVale);

    return this.http.post<IAsignacionVale>(
      `${this.baseUrl}/asignacionvale/insertar`,
      asignacionVale
    );
  }

  getValesAignar(cantidadVales: number) {
    return this.http.get<IValesAsignar>(
      `${this.baseUrl}/asignacionvale/listarvalesasignar/${cantidadVales}`
    );
  }

  getCodigoAsignacion(codigoSolitudVale: string) {
    return this.http.get<ICodigoAsignacion>(
      `${this.baseUrl}/asignacionvale/codigoasignacionvale/${codigoSolitudVale}`
    );
  }

  //Consulta las solitudes de vale por estado
  getSolicitdValePorEstado(estado: number) {
    return this.http.get<ISolicitudValeAprobar[]>(
      `${this.baseUrl}/asignacionvale/listarsolicitudvaleestado/${estado}`
    );
  }

  //Cambia el estado, minserta la cantidad y añade observaciones a la solicitud de vale
  solicitarAprobacion(solicitud: ISolcitudAprobar){
    return this.http.post<ISolcitudAprobar>(
      `${this.baseUrl}/asignacionvale/solitudaprobar`, solicitud
    );
  }

  obtenerNombreDiaYMes(
    fechaStr: string
  ): { nombreDia: string; nombreMes: string } | null {
    const fecha = new Date(fechaStr);

    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
      return null; // La fecha no es válida
    }

    const opcionesDia: Intl.DateTimeFormatOptions = { weekday: "long" }; // 'long' para obtener el nombre completo del día
    const opcionesMes: Intl.DateTimeFormatOptions = { month: "long" }; // 'long' para obtener el nombre completo del mes

    const nombreDia = fecha.toLocaleDateString(undefined, opcionesDia);
    const nombreMes = fecha.toLocaleDateString(undefined, opcionesMes);

    return { nombreDia, nombreMes };
  }

  dividirFecha(
    fechaStr: string
  ): { anio: string; mes: string; día: string } | null {
    // Dividir la cadena de fecha en sus componentes utilizando '/'
    const partes = fechaStr.split("-");

    // Verificar si hay tres componentes (año, mes y día)
    if (partes.length === 3) {
      const anio = partes[0];
      const mes = partes[1];
      const día = partes[2];

      return { anio, mes, día };
    } else {
      return null; // La cadena de fecha no tiene el formato esperado
    }
  }

  fechaFormatoGenerico(fecha: string) {
    const fechaf = this.obtenerNombreDiaYMes(fecha);
    const anio = this.dividirFecha(fecha);
    const dia = this.dividirFecha(fecha);
    const fechaLista =
      fechaf.nombreDia +
      ", " +
      dia.día +
      " de " +
      fechaf.nombreMes +
      " de " +
      anio.anio;
    return fechaLista;
  }

  getSolicitudesValeRol(rol: string, estado: number){
    this.http
        .get(`${this.baseUrl}/asignacionvale/listarsolicitudvaleestado/${rol}/${estado}`)
        .pipe(map((resp: any) => resp as ISolicitudValeAprobar[]))
        .subscribe(
          (soliVe: ISolicitudValeAprobar[]) => {
            this.listSolicitudesValeRol = soliVe;
          },
          (error) => {
            console.log("Error al obtener las solicitudes de vehiculo", error);
          }
        );
  }
}
