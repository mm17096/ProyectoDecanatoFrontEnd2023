import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { IProveedor } from "../interface/proveedor.interface";
import { environment } from "src/environments/environment";

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
}
