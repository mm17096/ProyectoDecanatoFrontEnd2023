import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProveedor } from "../../proveedor/interfaces/proveedor.interface";
import { environment } from "src/environments/environment";
import { IVale } from "../interfaces/vale.interface";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class DevolucionValeService {
  private baseUrl: string = environment.baseUrl;
  listProveedor: IProveedor[] = [];
  listVale: IVale[] = [];

  constructor(
    private http: HttpClient,
    private mensajesService: MensajesService
  ) {}

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

  getValesPorCantidad(cantidad: number = 0): Promise<IVale[]> {
    Swal.fire({
      title: "Espere",
      text: "Realizando la acción...",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      showConfirmButton: false,
    });

    return new Promise<IVale[]>((resolve, reject) => {
      if (cantidad != 0) {
        this.http
          .get(`${this.baseUrl}/vale/devolucioncantidad/${cantidad}`)
          .pipe(map((resp: any) => resp as IVale[]))
          .subscribe({
            next: (vale: IVale[]) => {
              Swal.close();
              this.listVale = vale;
              resolve(vale); // Resuelve la promesa con los datos
            },
            error: (err) => {
              Swal.close();
              this.mensajesService.mensajesSweet(
                "error",
                "Ups... Algo salió mal",
                err
              );
              reject(err);
            },
          });
      } else {
        Swal.close();
        this.listVale = [];
        resolve([]);
      }
    });
  }

  getValesPorMonto(monto: number = 0): Promise<IVale[]> {
    Swal.fire({
      title: "Espere",
      text: "Realizando la acción...",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      showConfirmButton: false,
    });

    return new Promise<IVale[]>((resolve, reject) => {
      if (monto != 0) {
        this.http
          .get(`${this.baseUrl}/vale/devolucionmonto/${monto}`)
          .pipe(map((resp: any) => resp as IVale[]))
          .subscribe({
            next: (vale: IVale[]) => {
              Swal.close();

              if (vale.length === 0) {
                this.listVale = [];
                this.mensajesService.mensajesSweet(
                  "info",
                  "Posibles razones...",
                  "Es posible que no se tengan existencias de vales, que con el monto ingresado no se puedan obtener vales o que no haya vales disponibles (Activos)",
                  "Entiendo"
                );
              } else {
                this.listVale = vale;
              }

              resolve(vale); // Resuelve la promesa con los datos
            },
            error: (err) => {
              Swal.close();
              this.mensajesService.mensajesSweet(
                "error",
                "Ups... Algo salió mal",
                err
              );
              reject(err);
            },
          });
      } else {
        Swal.close();
        this.listVale = [];
        resolve([]);
      }
    });
  }

  modificar(vales: IVale[]): any {
    return this.http.put(`${this.baseUrl}/vale/actualizarValesCantidad`, vales);
  }

  modificarPorCantidad(vales: IVale[], idProveedor: string): Observable<any> {
    const url = `${this.baseUrl}/vale/actualizarValesCantidad/${idProveedor}`;
    return this.http.put(url, vales);
  }
}
