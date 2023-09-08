import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IVehiculos } from "../interfaces/vehiculo-interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class VehiculoService {
  url = "http://localhost:8080/";
  listVehiclos:IVehiculos[]=[];

  constructor(private http: HttpClient) {}

  public gyetVehi(): Observable<IVehiculos[]> {
    return this.http
      .get<IVehiculos[]>(this.url + "api/vehiculo/lista")
      .pipe(map((resp: any) => resp.content as IVehiculos[]));
  }

  getVehiculos() {
    this.http
      .get(`${this.url}api/vehiculo/lista`)
      .pipe(map((resp: any) => resp.content as IVehiculos[]))
      .subscribe(
        (automovil: IVehiculos[]) => {
          this.listVehiclos = automovil; // Actualiza la propiedad listEmpleados
        },
        (error) => {
          console.error("Error al obtener las vehiculos:", error);
        }
      );
  }

  public guardarVehiculo(part:FormData){
    return this.http.post(`${this.url}api/vehiculo/insertar`, part);
  }

  public editarVehiculo(part:FormData){
    return this.http.put(`${this.url}api/vehiculo/editar`, part);
  }

}
