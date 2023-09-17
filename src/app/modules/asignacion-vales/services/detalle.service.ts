import { Injectable } from "@angular/core";
import { IAsignacionDetalle, IValesADevolver } from '../interfaces/asignacion.interface';
import { environment } from "src/environments/environment";

import { HttpClient } from '@angular/common/http';
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

  public NuevosDatos(document: IDocumentosvale, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('document', JSON.stringify(document));
    return this.http.post(`${this.burl}/document/insertar`, formData);
  }


  getDetalleAsignacionVale(codigoAsignacion: string) {
    return this.http.get<IAsignacionDetalle>(`${this.baseUrl}/asignacionvale/listar/${codigoAsignacion}`);
  }

  devolverVales(valesParaDevolucion:IValesADevolver) {
    console.log("interfaz: ", valesParaDevolucion);

    return this.http.post<IValesADevolver>(`${this.baseUrl}/asignacionvale/devolver`, valesParaDevolucion);
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
    title: string = "¿Está seguro de guardar?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "guardar"
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
