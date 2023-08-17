import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ICompra } from "../interface/datos.interface";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class CompraService {
  private baseUrl: string = environment.baseUrl;
  listCompra: ICompra[] = [];

  constructor(private http: HttpClient) {}

  getCompras() {
    return this.http
      .get(`${this.baseUrl}/compra/lista`)
      .subscribe((resp: any) => {
        this.listCompra = resp;
        console.log(resp);
      });
  }

  guardar(salida: ICompra): any {
    return this.http.post(`${this.baseUrl}/compra/insertar`, salida);
  }

  modificar(salida: ICompra): any {
    return this.http.put(
      `${this.baseUrl}/compra/editar/${salida.codigoCompra}`,
      salida
    );
  }

  borrar(dat: ICompra): Observable<ICompra> {
    return this.http.delete<ICompra>(
      `${this.baseUrl}/compra/eliminar/${dat.codigoCompra}`
    );
  }

  mensajesToast(
    icono: SweetAlertIcon = "info",
    title: string = "Registrado con éxito!"
  ) {
    Swal.fire({
      icon: icono,
      title: title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }

  async mensajesConfirmar(
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
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "¡Tiene que escribir algo!";
        }
        if(value != palabra){
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
