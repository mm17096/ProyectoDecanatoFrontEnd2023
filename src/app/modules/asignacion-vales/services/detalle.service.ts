import { Injectable } from "@angular/core";
import { IAsignacionDetalle, IValesADevolver, ILiquidacion, IAnularMision } from '../interfaces/asignacion.interface';
import { environment } from "src/environments/environment";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDocumentosvale} from '../interface/IDocumentosvale';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class DetalleService {

  //url='http://localhost:8080/document';
  private burl: string = environment.baseUrl;
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get ObtenerLista() {
    return this.http.get<IDocumentosvale[]>(`${this.baseUrl}/document`);
  }


  public NuevosDatos(document: IDocumentosvale, file: File): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const requestOptions = {
      headers: headers
    };
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('document', JSON.stringify(document));
    return this.http.post(`${this.burl}/document/insertar`, formData, requestOptions);
  }


  getDetalleAsignacionVale(codigoAsignacion: string) {
    return this.http.get<IAsignacionDetalle>(`${this.baseUrl}/asignacionvale/listar/${codigoAsignacion}`);
  }

  devolverVales(valesParaDevolucion:IValesADevolver) {
    console.log("interfaz: ", valesParaDevolucion);

    return this.http.post<IValesADevolver>(`${this.baseUrl}/asignacionvale/devolver`, valesParaDevolucion);
  }

  liquidarVales(valesParaLiquidar:ILiquidacion) {
    console.log("interfaz: ", valesParaLiquidar);
    return this.http.post<ILiquidacion>(`${this.baseUrl}/asignacionvale/liquidar`, valesParaLiquidar);
  }

  anularMision(misionAnulada: IAnularMision){
    console.log("interfaz: ", misionAnulada);
    return this.http.post<IAnularMision>(`${this.baseUrl}/asignacionvale/anular`, misionAnulada);
  }

  async mensajesConfirmarDevolucion(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de devolver?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "devolver"
  ) {
    let estado = false;
    const palabra = palabraClave;

    const { value: valorPalabra } = await Swal.fire({
      icon: icono,
      title: title,
      input: "text",
      inputLabel: label + palabraClave,
      inputValue: "",
      showCancelButton: true,
      confirmButtonColor: '#972727',
      confirmButtonText: "Aceptar",
      cancelButtonColor: '#2c3136',
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "¡Tiene que escribir algo!";
        }
        if (value != palabra) {
          return "¡No coincide!";
        }
      },
    });

    if (valorPalabra) {
      estado = true;
    }

    return estado;
  }
  async mensajesConfirmarLiquidacion(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de liquidar?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "liquidar"
  ) {
    let estado = false;
    const palabra = palabraClave;

    const { value: valorPalabra } = await Swal.fire({
      icon: icono,
      title: title,
      input: "text",
      inputLabel: label + palabraClave,
      inputValue: "",
      showCancelButton: true,
      confirmButtonColor: '#972727',
      confirmButtonText: "Aceptar",
      cancelButtonColor: '#2c3136',
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "¡Tiene que escribir algo!";
        }
        if (value != palabra) {
          return "¡No coincide!";
        }
      },
    });

    if (valorPalabra) {
      estado = true;
    }

    return estado;
  }

  async mensajesConfirmarAnular(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de Anular?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "anular"
  ) {
    let estado = false;
    const palabra = palabraClave;

    const { value: valorPalabra } = await Swal.fire({
      icon: icono,
      title: title,
      input: "text",
      inputLabel: label + palabraClave,
      inputValue: "",
      showCancelButton: true,
      confirmButtonColor: '#972727',
      confirmButtonText: "Aceptar",
      cancelButtonColor: '#2c3136',
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "¡Tiene que escribir algo!";
        }
        if (value != palabra) {
          return "¡No coincide!";
        }
      },
    });

    if (valorPalabra) {
      estado = true;
    }

    return estado;
  }
}
