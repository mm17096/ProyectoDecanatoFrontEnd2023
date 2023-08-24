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
      .get(`${this.baseUrl}/proveedor/listasinpagina`)
      .pipe(map((resp: any) => resp as IProveedor[]))
      .subscribe(
        (proveedor: IProveedor[]) => {
          this.listProveedor = proveedor;
        },
        (error) => {
          console.error("Error al obtener los proveedor:", error);
        }
      );
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
}
