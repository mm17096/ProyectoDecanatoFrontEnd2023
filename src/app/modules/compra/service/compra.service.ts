import { map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ICompra } from "../interface/compra.interface";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { Observable } from "rxjs";
import { IProveedor } from "../../proveedor/interface/proveedor.interface";

@Injectable({
  providedIn: "root",
})
export class CompraService {
  private baseUrl: string = environment.baseUrl;
  listCompra: ICompra[] = [];
  listProveedor: IProveedor[] = [];

  constructor(private http: HttpClient) {}

  getCompras() {
    this.http
      .get(`${this.baseUrl}/compra/lista`)
      .pipe(map((resp: any) => resp.content as ICompra[]))
      .subscribe(
        (compras: ICompra[]) => {
          this.listCompra = compras; // Actualiza la propiedad listCompra
        },
        (error) => {
          console.error("Error al obtener las compras:", error);
        }
      );
  }

  getProveedor() {
    this.http
      .get(`${this.baseUrl}/proveedor/lista`)
      .pipe(map((resp: any) => resp.content as IProveedor[]))
      .subscribe(
        (proveedor: IProveedor[]) => {
          this.listProveedor = proveedor;
        },
        (error) => {
          console.error("Error al obtener los proveedor:", error);
        }
      );
  }

  getProveedorsById(id: string) {
    if (id != "") {
      return this.http
        .get(`${this.baseUrl}/proveedor/lista/${id}`)
        .pipe(map((resp: any) => resp as IProveedor));
    } else {
      return this.http
        .get(`${this.baseUrl}/proveedor/lista`)
        .pipe(map((resp: any) => resp as IProveedor));
    }
  }

  guardar(compra: ICompra) {
    return this.http.post(`${this.baseUrl}/compra/insertar`, compra);
  }

  modificar(compra: ICompra): any {
    return this.http.put(`${this.baseUrl}/compra/editar/${compra.id}`, compra);
  }

  borrar(dat: ICompra): Observable<ICompra> {
    return this.http.delete<ICompra>(
      `${this.baseUrl}/compra/eliminar/${dat.id}`
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

  mensajesSweet(
    icono: SweetAlertIcon = "info",
    title: string = "Registrado con éxito!",
    text: string = "Datos almacenados exitosamente",
    boton: string = "Ok"
  ) {
    Swal.fire({
      icon: icono,
      title: title,
      text: text,
      confirmButtonText: boton,
      confirmButtonColor: '#972727',
    })
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
      inputValue: "",
      showCancelButton: true,
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
