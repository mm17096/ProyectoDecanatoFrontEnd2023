import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { IProveedor } from "../interface/proveedor.interface";
import { environment } from "src/environments/environment";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class ProveedorService {
  private baseUrl: string = environment.baseUrl;
  listProveedor: IProveedor[] = [];

  constructor(private http: HttpClient) {}

  getProveedors() {
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

  guardar(proveedor: IProveedor) {
    return this.http.post(`${this.baseUrl}/proveedor/insertar`, proveedor);
  }

  modificar(proveedor: IProveedor): any {
    return this.http.put(
      `${this.baseUrl}/proveedor/editar/${proveedor.id}`,
      proveedor
    );
  }

  borrar(dat: IProveedor): Observable<IProveedor> {
    return this.http.delete<IProveedor>(
      `${this.baseUrl}/proveedor/eliminar/${dat.id}`
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
